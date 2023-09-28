import prisma from "@/core/database";
import { ICreateUsers } from "../http/dtos/users.dto";
import { UsersService } from "./users.service";
import env from "@/config";
import OTP_MAIL from "@/app/notifications/emails/auth/otp.mail";
import { sendSMS } from "@/core/sms";
import { OTP_STRING } from "../notifications/sms/auth/otp.sms";
import { encrypt } from "@/core/encryption";
import VERICATION_MAIL from "../notifications/emails/auth/verification.mail";

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
    console.log("ERROR_IN_SAVING", err.Message);
    return { errorCode: "EXCEPTION_ERROR" };
  }
};

const sendEmailLink = () => {};

const sendOTP = () => {};

export const authService = {
  register,
};
