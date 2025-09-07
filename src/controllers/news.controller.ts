import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { Article } from "../types/types";

const articlesFile = path.join(__dirname, "../data/articles.json");
const articles: Article[] = JSON.parse(fs.readFileSync(articlesFile, "utf-8"));

export const getNews = (req: Request, res: Response) => {
  const {
    page = "1",
    limit = "10",
    search = "",
    sort = "desc",
    category,
    dateFilter = "all",
  } = req.query;

  let filtered = articles;

  // Filter by category
  if (category) {
    filtered = filtered.filter(
      (a) => a.category.toLowerCase() === String(category).toLowerCase()
    );
  }

  // Filter by search term
  if (search) {
    const term = String(search).toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(term) ||
        a.description.toLowerCase().includes(term)
    );
  }

  // Filter by date
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

  // Sort by published date
  filtered = filtered.sort((a, b) => {
    if (sort === "asc")
      return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  // Pagination
  const pageNum = parseInt(String(page), 10);
  const pageSize = parseInt(String(limit), 10);
  const start = (pageNum - 1) * pageSize;
  const end = start + pageSize;
  const paginated = filtered.slice(start, end);

  res.json({
    data: paginated,
    page: pageNum,
    hasMore: end < filtered.length,
    total: filtered.length,
  });
};
