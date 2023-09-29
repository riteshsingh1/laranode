import express, { Application } from "express";
import * as swaggerUi from "swagger-ui-express";
import authRoutes from "./auth.route";
import userRoutes from "./users.route";
import env from "@/config";
import swaggerDocument from "../docs/api.json";

const router: Application = express();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

if (env.APP_ENV === "local") {
  router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

export default router;
