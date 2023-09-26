import winston, { format } from "winston";
import env from "../config";

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

export default logger;
