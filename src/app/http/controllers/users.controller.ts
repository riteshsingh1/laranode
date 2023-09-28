import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UsersService } from "@services/users.service";

const { createUsers, editUsers, updateUsers, findAllUsers, deleteUsers } =
  UsersService;

const create = async (req: Request, res: Response) => {
  const result = validationResult(req);
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

const edit = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.json({
      errorCode: "VALIDATION_ERROR",
      data: result.array(),
    });
  }
  const { errorCode, data } = await editUsers(req.body);

  return res.json({
    errorCode,
    data,
  });
};

const update = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.json({
      errorCode: "VALIDATION_ERROR",
      data: result.array(),
    });
  }
  const { errorCode, data } = await updateUsers(req.body);
  return res.json({
    errorCode,
    data,
  });
};

const findAllRecords = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.json({
      errorCode: "VALIDATION_ERROR",
      data: result.array(),
    });
  }
  const { errorCode, data } = await findAllUsers();
  return res.json({
    errorCode,
    data,
  });
};

const deleteRecord = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.json({
      errorCode: "VALIDATION_ERROR",
      data: result.array(),
    });
  }
  const { errorCode } = await deleteUsers(req.body);

  return res.json({
    errorCode,
  });
};

export const usersController = {
  create,
  edit,
  update,
  deleteRecord,
  findAllRecords,
};
