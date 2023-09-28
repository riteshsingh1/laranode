import express, { Router } from "express";
import { authController } from "@/app/http/controllers/auth/auth.controller";
import { validateAuthRequest } from "@/app/http/validations/auth.validator";
const { signup } = authController;
const { validateSignUpRequest } = validateAuthRequest;
const router: Router = express.Router();

router.post("/signup", validateSignUpRequest, signup);

export default router;
