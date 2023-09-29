import express, { Router } from "express";
import { authController } from "@/app/http/controllers/auth/auth.controller";
import { validateAuthRequest } from "@/app/http/validations/auth.validator";
const {
  signup,
  resendVerificationRequest,
  login,
  forgotPassword,
  resetPassword,
} = authController;
const {
  validateSignUpRequest,
  validateForgotPasswordRequest,
  validateSignInRequest,
  resetPasswordRequest,
} = validateAuthRequest;
const router: Router = express.Router();

router.post("/signup", validateSignUpRequest, signup);
router.get("/verify", signup);
router.get("/resend-verification-request", resendVerificationRequest);
router.post("/signin", validateSignInRequest, login);
router.post("/forget-password", validateForgotPasswordRequest, forgotPassword);
router.post("/reset-password", resetPasswordRequest, resetPassword);

export default router;
