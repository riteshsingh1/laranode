import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { authService } from "@services/auth.service";

const { register } = authService;

const signup = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.json({
      errorCode: "VALIDATION_ERROR",
      data: result.array(),
    });
  }
  const { errorCode, data } = await register(req.body);
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
  verify,
  resendVerificationRequest,
  login,
  forgotPassword,
  resetPassword,
};
