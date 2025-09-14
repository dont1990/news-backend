import { Request, Response } from "express";
import { readJson } from "../utils/fileDb";
import { PAGE_LIMIT } from "../constants/constant";

// controllers/category.controller.ts
export async function getCategories(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || PAGE_LIMIT;
    
    const categories: string[] = await readJson("rssCategories.json");
    
    // Implement pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCategories = categories.slice(startIndex, endIndex);
    
    res.json({
      data: paginatedCategories,
      page,
      hasMore: endIndex < categories.length,
      total: categories.length,
    });
  } catch (error) {
    console.error("❌ Error loading categories:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load categories",
    });
  }
}