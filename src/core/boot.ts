import express, { Application } from "express";
import hpp from "hpp";
import helmet from "helmet";
import env from "@config/index";
import logger from "@/core/logger";
import { formatLog } from "@utils/formatLogger";
import router from "@routes/index";
import xss from "@/core/xss";

const app: Application = express();
app.use(hpp());
// Use Helmet!
app.use(helmet());
// Express JSON
app.use(express.json({ limit: env.APP_MAX_UPLOAD_LIMIT }));
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
// Load Queue
// if(env.q)
// const isQueueMonitorEnabled: boolean = Locals.config().queueMonitor;
// 		const queueMonitorPort: number = Locals.config().queueMonitorHttpPort;

// 		if (isQueueMonitorEnabled) {
// 			kue.app.listen(queueMonitorPort);

// 			console.log('\x1b[33m%s\x1b[0m', `Queue Monitor :: Running @ 'http://localhost:${queueMonitorPort}'`);
// 		}
// Start Server
app.listen(env.PORT, () => {
  logger.info(formatLog("SERVER::BOOTED::SUCCESSFULLY", { port: env.PORT }));
});
