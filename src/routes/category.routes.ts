import { Router } from "express";
import { getCategories } from "../controllers/category.controller";

const router = Router();

// GET /api/categories
router.get("/", getCategories);

export default router;
