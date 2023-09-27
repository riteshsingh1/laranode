import express, { Application, Router } from "express";
import authRoutes from "./auth.route";
import userRoutes from "./users.route";

const router: Application = express();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
