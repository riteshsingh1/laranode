import { z } from "zod";
export const mailConfig = {
  MAIL_MAILER: z.string(),
  MAIL_HOST: z.string(),
  MAIL_PORT: z.string(),
  MAIL_USERNAME: z.string(),
  MAIL_PASSWORD: z.string(),
};
