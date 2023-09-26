import { z } from "zod";
export const mailConfig = {
  SMTP_HOST: z.unknown(),
  MAIL_USERNAME: z.unknown(),
  MAIL_PASSWORD: z.unknown(),
  SMTP_PORT: z.unknown(),
};
