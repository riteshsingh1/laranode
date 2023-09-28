import express, { Application } from "express";
import hpp from "hpp";
import helmet from "helmet";
import env from "@config/index";
import logger from "@/core/logger";
import { formatLog } from "@utils/formatLogger";
import router from "@routes/index";
import xss from "@/core/xss";
import morgan from "morgan";

const app: Application = express();
// Use Morgan!
app.use(
  morgan(
    ":remote-addr :method   { url- :url}  {status - :status}  {res - contentLength :res[content-length] }   {responseTime - :response-time ms} {userAgent - :user-agent} "
  )
);
app.use(hpp());
// Use Helmet!
app.use(helmet());
// Express JSON
app.use(express.json({ limit: env.APP_MAX_UPLOAD_LIMIT }));
// Filter XSS Attacks
app.use(xss());
// Router
app.use(router);
// 404 Route
app.use("*", (_, res) => {
  return res.status(404).json({
    status: "NOT_FOUND",
    message: "The route you are looking for is not defined.",
  });
});
// Start Server
app.listen(env.PORT, () => {
  logger.info(formatLog("SERVER::BOOTED::SUCCESSFULLY", { port: env.PORT }));
});
