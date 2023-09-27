import express, { Router } from "express";
import authRoutes from "./auth.route";

const router: Router = express.Router();

router.post("/auth", authRoutes);

export default router;
