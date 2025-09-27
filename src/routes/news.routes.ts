// src/routes/newsRoutes.ts
import { Router } from "express";
import {
  getBreakingNews,
  getHeroNews,
  getNews,
  getNewsById,
  getTrendingNews,
  incrementArticleViews,
} from "../controllers/news.controller";

const router = Router();

router.get("/", getNews);
router.get("/hero", getHeroNews);
router.get("/breaking", getBreakingNews);
router.get("/trending", getTrendingNews);
router.get("/:id", getNewsById);
router.post("/:id/view", incrementArticleViews);

export default router;
