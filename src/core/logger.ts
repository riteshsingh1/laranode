import winston, { format } from "winston";
import env from "@config/index";
import morgan from "morgan";
import fs from "fs";

const { combine, timestamp, label, printf } = format;
const CATEGORY = "Laranode";

//Using the printf format.
const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
const logger = winston.createLogger({
  level: env.LOG_LEVEL || "debug",
  format: combine(label({ label: CATEGORY }), timestamp(), customFormat),
  transports: [new winston.transports.Console()],
});
export const httpLog = morgan(
  ":remote-addr :method   { url- :url}  {status - :status}  {res - contentLength :res[content-length] }   {responseTime - :response-time ms} {userAgent - :user-agent} ",
  env.APP_ENV !== "local"
    ? {
        stream: fs.createWriteStream("logs/access.log", {
          flags: "a",
        }),
      }
    : {
        stream: process.stdout,
      }
);

export default logger;
