import { z } from "zod";
export const authConfig = {
  AUTH_TABLE: z.string().nonempty(),
  AUTH_TABLE_USERNAME: z.string().nonempty(),
  AUTH_TABLE_PASSWORD: z.string().nonempty(),
  AUTH_USER_VERIFICATION: z.string().nonempty(),
  VERIFICATION_METHOD: z.string().nonempty(),
  ENCRYPT_TOKEN: z.string().nonempty(),
  AUTH_TOKEN_TYPE: z.string().nonempty(),
  VERIFICATION_TRANSPORT: z.string().nonempty(),
};
