import express from "express";
import { getUserClaims, triggerEvent } from "../controllers/claimController.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getUserClaims);
router.get("/trigger/:event", triggerEvent);

export default router;
