import { z } from "zod";
export const appConfig = {
  APP_NAME: z.string().nonempty(),
  APP_ENV: z.string().nonempty(),
  APP_SECRET: z.string().nonempty(),
  PORT: z.string(),
  APP_MAX_UPLOAD_LIMIT: z.string(),
  QUEUE_HTTP_ENABLED: z.string(),
};
