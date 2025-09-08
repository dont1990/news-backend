// src/routes/newsRoutes.ts
import { Router } from "express";
import {
  getBreakingNews,
  getNews,
  getNewsById,
  getTrendingNews,
} from "../controllers/news.controller";

const router = Router();

router.get("/", getNews);
router.get("/:id", getNewsById);
router.get("/breaking", getBreakingNews);
router.get("/trending", getTrendingNews);

export default router;
