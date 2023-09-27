import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UsersService } from "@services/users.service";

const { createUsers } = UsersService;

const signup = async (req: Request, res: Response) => {
  const result = validationResult(req.body);
  if (!result.isEmpty()) {
    return res.json({
      errorCode: "VALIDATION_ERROR",
      data: result.array(),
    });
  }
  const { errorCode, data } = await createUsers(req.body);
  return res.json({
    errorCode,
    data,
  });
};

const verify = async (req: Request, res: Response) => {};
const resendVerificationRequest = async (req: Request, res: Response) => {};
const login = async (req: Request, res: Response) => {};
const forgotPassword = async (req: Request, res: Response) => {};
const resetPassword = async (req: Request, res: Response) => {};

export const authController = {
  signup,
};
