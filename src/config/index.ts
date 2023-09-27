import { appConfig } from "@config/app";
import { mailConfig } from "@config/mail";
import { logConfig } from "@config/logger";
import { z } from "zod";
import dotenv from "dotenv";

//For env File
dotenv.config();

const validatedEnv = z.object({
  ...appConfig,
  ...mailConfig,
  ...logConfig,
});

const env = validatedEnv.parse(process.env);

export default env;
