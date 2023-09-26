import { z } from "zod";
export const appConfig = {
  APP_NAME: z.string().nonempty(),
  APP_ENV: z.string().nonempty(),
  PORT: z.string(),
};
