import express, { Application } from "express";
import hpp from "hpp";
import helmet from "helmet";
import env from "../config";
import logger from "./logger";
import { utils } from "./utils";
import router from "../routes";
import xss from "./xss";

const app: Application = express();
app.use(hpp());
// Use Helmet!
app.use(helmet());
// Express JSON
app.use(express.json({ limit: "50mb" }));
// Filter XSS Attacks
app.use(xss());
// Router
app.use("/", router);
// 404 Route
app.use("*", (_, res) => {
  return res.status(404).json({
    status: "NOT_FOUND",
  });
});
// Start Server
app.listen(env.PORT, () => {
  logger.info(
    utils.formatLog("SERVER::BOOTED::SUCCESSFULLY", { port: env.PORT })
  );
});
