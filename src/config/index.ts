import { appConfig } from "./app";
import { mailConfig } from "./mail";
import { logConfig } from "./logger";
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
