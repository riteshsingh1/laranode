import { usersRequestValidator } from "./users.validator";
import { body } from "express-validator";

const ValidateSignUpRequest = [
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

export const validateAuthRequest = {
  ValidateSignUpRequest,
};
