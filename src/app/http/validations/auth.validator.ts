import { usersRequestValidator } from "./users.validator";
import { body } from "express-validator";

const validateSignUpRequest = [
  ...usersRequestValidator.validateCreateUsersRequest,
  body("confirmPassword")
    .notEmpty()
    .isLength({ min: 8 })
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
];

const validateSignInRequest = [
  body("username").notEmpty(),
  body("password").notEmpty(),
];

const validateForgotPasswordRequest = [body("field").notEmpty()];

const resetPasswordRequest = [
  body("password").notEmpty().isLength({ min: 8 }),
  body("otp").notEmpty(),
  body("token").notEmpty(),
];

export const validateAuthRequest = {
  validateSignUpRequest,
  validateSignInRequest,
  validateForgotPasswordRequest,
  resetPasswordRequest,
};
