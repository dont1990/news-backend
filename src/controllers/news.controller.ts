import { Request, Response } from "express";
import { Article } from "../types/types";
import { getCachedArticles } from "../utils/cronJob";

function getArticles(): Article[] {
  return getCachedArticles();
}

// Get all news with filters, pagination, search
export const getNews = (req: Request, res: Response) => {
  const { page = "1", limit = "10", search = "", sort = "desc", category, dateFilter = "all" } = req.query;

  let filtered: Article[] = [...getArticles()];

  // Category filter
  if (category) {
    const cat = String(category).toLowerCase();
    filtered = filtered.filter(a => a.category?.toLowerCase() === cat);
  }

  // Search
  if (search) {
    const term = String(search).toLowerCase();
    filtered = filtered.filter(
      a => a.title.toLowerCase().includes(term) || a.description.toLowerCase().includes(term)
    );
  }

  // Date filter
  if (dateFilter && dateFilter !== "all") {
    const now = new Date();
    filtered = filtered.filter(a => {
      const pub = new Date(a.publishedAt);
      switch (String(dateFilter)) {
        case "today":
          return pub.toDateString() === now.toDateString();
        case "week":
          const weekAgo = new Date();
          weekAgo.setDate(now.getDate() - 7);
          return pub >= weekAgo;
        case "month":
          const monthAgo = new Date();
          monthAgo.setMonth(now.getMonth() - 1);
          return pub >= monthAgo;
        default:
          return true;
      }
    });
  }

  // Sort
  filtered = filtered.sort((a, b) =>
    sort === "asc"
      ? new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      : new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Pagination
  const pageNum = Math.max(1, parseInt(String(page), 10));
  const pageSize = Math.max(1, parseInt(String(limit), 10));
  const start = (pageNum - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  res.json({
    data: paginated,
    page: pageNum,
    hasMore: start + pageSize < filtered.length,
    total: filtered.length
  });
};

// Get single news by ID
export const getNewsById = (req: Request, res: Response) => {
  const article = getArticles().find(a => a.id === req.params.id);
  if (!article) return res.status(404).json({ message: "Article not found" });
  res.json(article);
};

// Breaking news (latest)
export const getBreakingNews = (req: Request, res: Response) => {
  const { limit = "5" } = req.query;
  const articles: Article[] = getArticles().sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  res.json(articles.slice(0, Number(limit)));
};

// Trending news (random example)
export const getTrendingNews = (req: Request, res: Response) => {
  const { limit = "5" } = req.query;
  const articles: Article[] = [...getArticles()];
  const shuffled = articles.sort(() => Math.random() - 0.5);
  res.json(shuffled.slice(0, Number(limit)));
};
