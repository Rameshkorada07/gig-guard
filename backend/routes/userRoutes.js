import express from "express";
import { getUserProfile, calculateRiskScore } from "../controllers/userController.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", verifyToken, getUserProfile);
router.post("/risk-score", calculateRiskScore);

export default router;
