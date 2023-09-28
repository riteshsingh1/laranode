import { appConfig } from "@config/app";
import { mailConfig } from "@config/mail";
import { logConfig } from "@config/logger";
import { queConfig } from "@config/queue";
import { databaseConfig } from "@config/database";
import { authConfig } from "@config/auth";
import { z } from "zod";
import dotenv from "dotenv";

//For env File
dotenv.config();

const validatedEnv = z.object({
  ...appConfig,
  ...mailConfig,
  ...logConfig,
  ...queConfig,
  ...databaseConfig,
  ...authConfig,
});

const env = validatedEnv.parse(process.env);

export default env;
