// src/controllers/news.controller.ts
import { Request, Response } from "express";
import { Article } from "../types/types";
import { readJson } from "../utils/fileDb";
import { getCachedArticles } from "./news.scraper";

const articlesFile = "articles.json";

// Helper to get latest articles (from cache or file)
function getArticles(): Article[] {
  const cached = getCachedArticles();
  if (cached && cached.length > 0) return cached;

  try {
    return readJson<Article[]>(articlesFile);
  } catch {
    return [];
  }
}

// ✅ Get all news with filters, pagination, search
export const getNews = (req: Request, res: Response) => {
  const {
    page = "1",
    limit = "10",
    search = "",
    sort = "desc",
    category,
    dateFilter = "all",
  } = req.query;
console.log('first')
  let filtered: Article[] = [...getArticles()];

  if (category) {
    filtered = filtered.filter(
      (a) => a.category.toLowerCase() === String(category).toLowerCase()
    );
  }

  if (search) {
    const term = String(search).toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(term) ||
        a.description.toLowerCase().includes(term)
    );
  }

  if (dateFilter && dateFilter !== "all") {
    const now = new Date();
    filtered = filtered.filter((a) => {
      const pub = new Date(a.publishedAt);
      switch (String(dateFilter)) {
        case "today":
          return pub.toDateString() === now.toDateString();
        case "week": {
          const weekAgo = new Date();
          weekAgo.setDate(now.getDate() - 7);
          return pub >= weekAgo;
        }
        case "month": {
          const monthAgo = new Date();
          monthAgo.setMonth(now.getMonth() - 1);
          return pub >= monthAgo;
        }
        default:
          return true;
      }
    });
  }

  filtered = filtered.sort((a, b) =>
    sort === "asc"
      ? new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      : new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const pageNum = Math.max(1, parseInt(String(page), 10) || 1);
  const pageSize = Math.max(1, parseInt(String(limit), 10) || 10);

  const start = (pageNum - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  res.json({
    data: paginated,
    page: pageNum,
    hasMore: start + pageSize < filtered.length,
    total: filtered.length,
  });
};

// ✅ Get single news by ID
export const getNewsById = (req: Request, res: Response) => {
  const articles = getArticles();

  const article = articles.find((a) => a.id === req.params.id);

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  res.json(article);
};

// For breaking news (latest news)
export const getBreakingNews = (req: Request, res: Response) => {
  const { limit = "5" } = req.query;
  const articles: Article[] = getArticles().sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  res.json(articles.slice(0, Number(limit)));
};

// For trending news (mock: most recent or random)
export const getTrendingNews = (req: Request, res: Response) => {
  const { limit = "5" } = req.query;
  const articles: Article[] = getArticles();

  // Example: pick random trending articles
  const shuffled = [...articles].sort(() => Math.random() - 0.5);
  res.json(shuffled.slice(0, Number(limit)));
};
