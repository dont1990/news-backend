import { Router } from "express";
import { getNewspapers } from "../controllers/newspapers.controller";

const router = Router();
router.get("/", getNewspapers);

export default router;
