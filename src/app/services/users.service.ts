import prisma from "@/core/database";
import {
  ICreateUsers,
  IUpdateUsers,
  IEditUsers,
  IDeleteUsers,
} from "@dtos/users.dto";
import bcrypt from "bcrypt";
import _ from "underscore";

/**
 * Saves users into database
 * @param data {
 * name: string,
 * email: string,
 * mobile: string,
 * password: string,
 * }
 * @returns {errorCode:'NO_ERROR' | 'EXCEPTION_ERROR', data:any}
 */
const createUsers = async (
  data: ICreateUsers
): Promise<{ errorCode: "NO_ERROR" | "EXCEPTION_ERROR"; data: any }> => {
  try {
    data.password = await bcrypt.hash(data.password, 10);
    const model = await prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        password: data.password,
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    if (model) {
      return {
        errorCode: "NO_ERROR",
        data: model,
      };
    }
    return { errorCode: "EXCEPTION_ERROR", data: null };
  } catch (err: any) {
    console.log("ERROR_IN_SAVING", err.Message);
    return { errorCode: "EXCEPTION_ERROR", data: null };
  }
};

/**
 * Fetches Single User From Database
 * @param data {
 *  id: number
 * }
 * @returns { errorCode:'NO_ERROR' | 'EXCEPTION_ERROR', data:any }
 */
const editUsers = async (
  data: IEditUsers
): Promise<{ errorCode: "NO_ERROR" | "EXCEPTION_ERROR"; data: any }> => {
  try {
    const model = await prisma.users.findFirst({
      where: {
        id: data.id,
      },
    });

    if (model) {
      _.omit(model, ["password"]);
      return {
        errorCode: "NO_ERROR",
        data: model,
      };
    }
    return { errorCode: "EXCEPTION_ERROR", data: null };
  } catch (err: any) {
    console.log("ERROR_IN_FETCHING", err.Message);
    return { errorCode: "EXCEPTION_ERROR", data: null };
  }
};

/**
 * Updates single  users into database
 * @param data {
 * name: string,
 * email: string,
 * mobile: string,
 * password: string,
 * }
 * @returns {errorCode:'NO_ERROR' | 'EXCEPTION_ERROR', data:any}
 */
const updateUsers = async (
  data: IUpdateUsers
): Promise<{
  errorCode: "NO_ERROR" | "EXCEPTION_ERROR" | "INVALID_DATA";
  data?: any;
}> => {
  try {
    const model = await prisma.users.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        password: data.password,
        updatedAt: new Date(),
      },
    });
    if (model) {
      return {
        errorCode: "NO_ERROR",
        data: model,
      };
    }
    return { errorCode: "EXCEPTION_ERROR" };
  } catch (err: any) {
    console.log("ERROR_IN_SAVING", err.Message);
    return { errorCode: "EXCEPTION_ERROR", data: null };
  }
};

/**
 * Fetches All users From Database
 * @returns {errorCode: 'NO_ERROR' | 'EXCEPTION_ERROR', data? : any}
 */
const findAllUsers = async (): Promise<{
  errorCode: "NO_ERROR" | "EXCEPTION_ERROR";
  data?: any;
}> => {
  try {
    const record = await prisma.users.findMany();

    if (record) {
      return {
        errorCode: "NO_ERROR",
        data: record,
      };
    }
    return { errorCode: "EXCEPTION_ERROR" };
  } catch (err: any) {
    console.log("ERROR_IN_SAVING", err.Message);
    return { errorCode: "EXCEPTION_ERROR", data: null };
  }
};

/**
 * Deletes Single users From Database
 * @returns {errorCode: 'NO_ERROR' | 'EXCEPTION_ERROR'}
 */
const deleteUsers = async (
  data: IDeleteUsers
): Promise<{ errorCode: "NO_ERROR" | "EXCEPTION_ERROR" }> => {
  try {
    const record = await prisma.users.delete({
      where: {
        id: data.id,
      },
    });

    if (record) {
      return {
        errorCode: "NO_ERROR",
      };
    }
    return { errorCode: "EXCEPTION_ERROR" };
  } catch (err: any) {
    console.log("ERROR_IN_SAVING", err.Message);
    return { errorCode: "EXCEPTION_ERROR" };
  }
};

export const UsersService = {
  createUsers,
  editUsers,
  updateUsers,
  findAllUsers,
  deleteUsers,
};
