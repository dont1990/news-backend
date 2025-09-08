// src/controllers/news.controller.ts
import { Request, Response } from "express";
import { Article } from "../types/types";
import { readJson } from "../utils/fileDb";

const articlesFile = "articles.json";

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

  // Always read fresh data
  let filtered;
  try {
    const articles = readJson<Article[]>(articlesFile);
    filtered = [...articles];
  } catch (err) {
    return res.status(500).json({ message: "Failed to load articles" });
  }

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
  const articles = readJson<Article[]>(articlesFile);

  const article = articles.find((a) => a.id === req.params.id);

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  res.json(article);
};

// For breaking news (latest news)
export const getBreakingNews = (req: Request, res: Response) => {
  const { limit = "5" } = req.query;
  let articles: Article[] = readJson<Article[]>(articlesFile);

  articles = articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  res.json(articles.slice(0, Number(limit)));
};

// For trending news (mock: most recent or random)
export const getTrendingNews = (req: Request, res: Response) => {
  const { limit = "5" } = req.query;
  let articles: Article[] = readJson<Article[]>(articlesFile);

  // Here we just return the first few articles as trending
  res.json(articles.slice(0, Number(limit)));
};