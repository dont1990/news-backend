import { Router } from "express";
import {
  getTagsStats,
  getTrendingTags,
  incrementTagClickController,
} from "../controllers/tags.controller";

const router = Router();

router.get("/", getTagsStats);
router.get("/trending", getTrendingTags);
router.post("/:tag/click", incrementTagClickController);

export default router;
