import express, { Router } from "express";
import { usersController } from "@controllers/users.controller";
import { usersRequestValidator } from "@validations/users.validator";

const {
  validateCreateUsersRequest,
  validateEditUsersRequest,
  validateUpdateUsersRequest,
  validateDeleteUsersRequest,
} = usersRequestValidator;

const { findAllRecords, create, edit, update, deleteRecord } = usersController;

const router: Router = express.Router();
/**
 * Get All Records
 * @request{}
 * @response JSON [{name: string,email: string,mobile: string,password: string,isVerified: boolean,timestamps: undefined,}]
 **/
router.get("/get-all-users", findAllRecords);
/**
 * Create New users
 * @request{* name: string,* email: string,* mobile: string,* password: string,
 **/
router.post("/create", validateCreateUsersRequest, create);
router.post("/edit", validateEditUsersRequest, edit);
router.post("/update", validateUpdateUsersRequest, update);
router.post("/delete", validateDeleteUsersRequest, deleteRecord);

export default router;
