import prisma from "@/core/database";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { ICreateUsers } from "../http/dtos/users.dto";
import { UsersService } from "./users.service";
import env from "@/config";
import OTP_MAIL from "@/app/notifications/emails/auth/otp.mail";
import { sendSMS } from "@/core/sms";
import { OTP_STRING } from "../notifications/sms/auth/otp.sms";
import { decrypt, encrypt } from "@/core/encryption";
import VERICATION_MAIL from "../notifications/emails/auth/verification.mail";
import { LoginDto } from "../http/dtos/auth.dto";

const register = async (
  data: ICreateUsers
): Promise<{
  errorCode: "NO_ERROR" | "EXCEPTION_ERROR";
  data?: {
    responseToken: string;
  };
}> => {
  try {
    const saveUser = await UsersService.createUsers(data);
    if (saveUser.errorCode === "NO_ERROR") {
      if (Boolean(env.AUTH_USER_VERIFICATION)) {
        if (env.VERIFICATION_METHOD === "link") {
          const responseToken = encrypt(
            `${saveUser.data.id}__${new Date().getTime() + 600000}__retry=0`
          );
          await VERICATION_MAIL(saveUser.data.email, responseToken);
          return { errorCode: "NO_ERROR" };
        }
        if (env.VERIFICATION_METHOD === "otp") {
          const otp = Math.floor(100000 + Math.random() * 900000);
          if (env.VERIFICATION_TRANSPORT === "email") {
            // send email
            await OTP_MAIL(saveUser.data.email, otp.toString());
          }
          if (env.VERIFICATION_TRANSPORT === "sms") {
            // send sms
            await sendSMS(
              `+91${saveUser.data.mobile}`,
              OTP_STRING.replace("{{otp}}", otp.toString())
            );
          }
          const responseToken = encrypt(
            `${saveUser.data.id}__${otp}__${
              new Date().getTime() + 600000
            }__retry=0`
          );

          return { errorCode: "NO_ERROR", data: { responseToken } };
        }
      }
      return { errorCode: "NO_ERROR" };
    }
    return { errorCode: "EXCEPTION_ERROR" };
  } catch (err: any) {
    console.log("ERROR_IN_SAVING", err);
    return { errorCode: "EXCEPTION_ERROR" };
  }
};

const verifyLink = async (
  token: string
): Promise<{
  errorCode:
    | "NO_ERROR"
    | "EXCEPTION_ERROR"
    | "OTP_EXPIRED"
    | "RETRY_COUNT_EXCEDDED";
  data?: any;
}> => {
  try {
    const data = decrypt(token);
    const [id, expiry, retry] = data.split("__");
    if (Number(retry) > 3) {
      return { errorCode: "RETRY_COUNT_EXCEDDED", data: "OTP Expired" };
    }
    if (Number(expiry) < new Date().getTime()) {
      return { errorCode: "OTP_EXPIRED", data: "OTP Expired" };
    }
    await prisma.users.update({
      where: {
        id: Number(id),
      },
      data: {
        isVerified: true,
        updatedAt: new Date(),
      },
    });
    return { errorCode: "NO_ERROR", data: null };
  } catch (err: any) {
    console.log(err);
    return { errorCode: "EXCEPTION_ERROR", data: null };
  }
};

const verifyOTP = async (token: string, userOtp: string) => {
  const data = decrypt(token);
  const [id, otp, expiry, retry] = data.split("__");
  if (Number(retry) > 3) {
    return { errorCode: "RETRY_COUNT_EXCEDDED", data: "OTP Expired" };
  }
  if (Number(expiry) < new Date().getTime()) {
    return { errorCode: "OTP_EXPIRED", data: "OTP Expired" };
  }
  if (otp !== userOtp) {
    return { errorCode: "INVALID_OTP", data: "Invalid OTP" };
  }
  await prisma.users.update({
    where: {
      id: Number(id),
    },
    data: {
      isVerified: true,
      updatedAt: new Date(),
    },
  });
  return { errorCode: "NO_ERROR", data: null };
};

const verifyLoginRequest = async (username: string, password: string) => {
  try {
    const getUser = await prisma.users.findFirst({
      where: {
        [env.AUTH_TABLE_USERNAME]: username,
      },
    });
    if (!getUser) {
      return { errorCode: "INVALID_CREDENTIALS", data: "Invalid Credentials" };
    }
    if (!getUser.isVerified) {
      return { errorCode: "NOT_VERIFIED", data: "User Not Verified" };
    }
    const isPasswordValid = await bcrypt.compare(password, getUser.password);
    if (!isPasswordValid) {
      return { errorCode: "INVALID_CREDENTIALS", data: "Invalid Credentials" };
    }
    const token = sign(
      // @ts-ignore
      { username: getUser[env.AUTH_TABLE_USERNAME] },
      env.APP_SECRET,
      {
        expiresIn: env.AUTH_TOKEN_EXPIRY,
      }
    );
    return { errorCode: "NO_ERROR", data: { token } };
  } catch (err: any) {
    console.log(err);
    return { errorCode: "EXCEPTION_ERROR", data: null };
  }
};

const resendVerificationRequest = async (token: string) => {
  const data = decrypt(token);
  const [id, otp, expiry, retry] = data.split("__");
  if (Number(retry) > 3) {
    return { errorCode: "RETRY_COUNT_EXCEDDED", data: "OTP Expired" };
  }
  if (Number(expiry) < new Date().getTime()) {
    return { errorCode: "OTP_EXPIRED", data: "OTP Expired" };
  }
  const otpNew = Math.floor(100000 + Math.random() * 900000);
  if (env.VERIFICATION_TRANSPORT === "email") {
    // send email
    await OTP_MAIL(id, otpNew.toString());
  }
  if (env.VERIFICATION_TRANSPORT === "sms") {
    // send sms
    await sendSMS(`+91${id}`, OTP_STRING.replace("{{otp}}", otpNew.toString()));
  }
  const responseToken = encrypt(
    `${id}__${otpNew}__${new Date().getTime() + 600000}__retry=${
      Number(retry) + 1
    }`
  );
  return { errorCode: "NO_ERROR", data: { responseToken } };
};

const forgotPassword = async (field: string) => {
  const getUser = await prisma.users.findFirst({
    where: {
      [env.AUTH_TABLE_USERNAME]: field,
    },
  });
  if (!getUser) {
    return { errorCode: "INVALID_FIELD", data: "Invalid Field" };
  }
  const otp = Math.floor(100000 + Math.random() * 900000);
  if (env.VERIFICATION_TRANSPORT === "email") {
    // send email
    await OTP_MAIL(getUser.email, otp.toString());
  }
  if (env.VERIFICATION_TRANSPORT === "sms") {
    // send sms
    await sendSMS(
      `+91${getUser.mobile}`,
      OTP_STRING.replace("{{otp}}", otp.toString())
    );
  }
  const responseToken = encrypt(
    `${getUser.id}__${otp}__${new Date().getTime() + 600000}__retry=0`
  );
  return { errorCode: "NO_ERROR", data: { responseToken } };
};

const resetPassword = async (data: {
  otp: string;
  password: string;
  token: string;
}) => {
  const dataDecrypted = decrypt(data.token);
  const [id, otp, expiry, retry] = dataDecrypted.split("__");
  if (Number(retry) > 3) {
    return { errorCode: "RETRY_COUNT_EXCEDDED", data: "OTP Expired" };
  }
  if (Number(expiry) < new Date().getTime()) {
    return { errorCode: "OTP_EXPIRED", data: "OTP Expired" };
  }
  if (otp !== data.otp) {
    return { errorCode: "INVALID_OTP", data: "Invalid OTP" };
  }
  const password = await bcrypt.hash(data.password, 10);
  await prisma.users.update({
    where: {
      id: Number(id),
    },
    data: {
      password,
      updatedAt: new Date(),
    },
  });
  return { errorCode: "NO_ERROR", data: null };
};

export const authService = {
  register,
  verifyLink,
  verifyOTP,
  verifyLoginRequest,
  resendVerificationRequest,
  forgotPassword,
  resetPassword,
};
