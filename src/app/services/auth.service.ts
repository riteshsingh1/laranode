import prisma from "@/core/database";
import { ICreateUsers } from "../http/dtos/users.dto";
import { UsersService } from "./users.service";
import env from "@/config";

const register = async (data: ICreateUsers) => {
  try {
    const saveUser = await UsersService.createUsers(data);
    if (saveUser.errorCode === "NO_ERROR") {
      if (Boolean(env.AUTH_USER_VERIFICATION)) {
        if (env.VERIFICATION_METHOD === "link") {
        }
        if (env.VERIFICATION_METHOD === "otp") {
          // const otp = Math.floor(100000 + Math.random() * 900000);
        }
      }
      return { errorCode: "NO_ERROR", data: saveUser.data };
    }
    return { errorCode: "EXCEPTION_ERROR", data: null };
  } catch (err: any) {
    console.log("ERROR_IN_SAVING", err.Message);
    return { errorCode: "EXCEPTION_ERROR", data: null };
  }
};

const sendEmailLink = () => {};

export const authService = {
  register,
};
