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

const verifyLink = async (req: Request, res: Response) => {
  const d = req.query.token;
  if (!d) {
    return res.json({
      errorCode: "VALIDATION_ERROR",
      data: "Invalid Token",
    });
  }
  const data = authService.verifyLink(d.toString());
  return res.json(data);
};

const resendVerificationRequest = async (req: Request, res: Response) => {
  const d = req.query.token;
  if (!d) {
    return res.json({
      errorCode: "VALIDATION_ERROR",
      data: "Invalid Token",
    });
  }
  const data = authService.resendVerificationRequest(d.toString());
  return res.json(data);
};

/**
 * Login user to the system
 * @param req Request
 * @param res Response
 * @returns Json Data
 */
const login = async (req: Request, res: Response) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.json({
        errorCode: "VALIDATION_ERROR",
        data: result.array(),
      });
    }
    const data = await authService.verifyLoginRequest(
      req.body.username,
      req.body.password
    );
    return res.json(data);
  } catch (e) {
    return res.json({
      errorCode: "SERVER_ERROR",
    });
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const field: string = req.body.field;
    const data = await authService.forgotPassword(field);
    return res.json(data);
  } catch (e) {
    return res.json({
      errorCode: "SERVER_ERROR",
    });
  }
};
const resetPassword = async (req: Request, res: Response) => {
  const data = await authService.resetPassword(req.body);
  return res.json(data);
};

export const authController = {
  signup,
  verifyLink,
  resendVerificationRequest,
  login,
  forgotPassword,
  resetPassword,
};
