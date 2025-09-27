import { Router } from "express";
import { getWorldClock } from "../controllers/worldClock.controller";

const router = Router();

// GET /api/world-clock?timezone=Europe/London
router.get("/", getWorldClock);

export default router;
