import express, { Router } from "express";
import { authController } from "@/app/http/controllers/auth/auth.controller";
import { validateAuthRequest } from "@/app/http/validations/auth.validator";
const { signup } = authController;
const { ValidateSignUpRequest } = validateAuthRequest;
const router: Router = express.Router();

/**
 * Sign up a user
 * @request {}
 */
router.post("/signup", ValidateSignUpRequest, signup);

export default router;
