import express from "express";
import { activatePolicy, getUserPolicy } from "../controllers/policyController.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.post("/activate", verifyToken, activatePolicy);
router.get("/", verifyToken, getUserPolicy);

export default router;
