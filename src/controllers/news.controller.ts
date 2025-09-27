import { Request, Response } from "express";
import { Article } from "../types/types";
import { getCachedArticles } from "../utils/cronJob";
import { PAGE_LIMIT } from "../constants/global";
import { sortByDateAsc, sortByDateDesc } from "../utils/helper/sortArticles";
import { normalizePersian } from "../utils/helper/normalizePersian";
import stringSimilarity from "string-similarity";

function getArticles(): Article[] {
  return getCachedArticles();
}

// Get all news with filters, pagination, search
export const getNews = (req: Request, res: Response) => {
  const {
    page = "1",
    limit = PAGE_LIMIT,
    search = "",
    sort = "desc",
    category,
    dateFilter = "all",
    tags = [],
  } = req.query;

  let filtered: Article[] = [...getArticles()];

  // Category filter
  if (category) {
    const cat = String(category).toLowerCase();
    filtered = filtered.filter((a) => a.category?.toLowerCase() === cat);
  }

  // Search
  if (search) {
    const term = String(search).toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(term) ||
        a.description.toLowerCase().includes(term)
    );
  }
  // Hashtags
  if (tags.length) {
    const tagArray = String(tags)
      .split(",")
      .map((t) => t.toLowerCase().trim());
    filtered = filtered.filter((a) =>
      a.tags?.some((tag) => tagArray.includes(tag.toLowerCase()))
    );
  }

  // Date filter
  if (dateFilter && dateFilter !== "all") {
    const now = new Date();
    filtered = filtered.filter((a) => {
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
  filtered =
    sort === "asc" ? sortByDateAsc(filtered) : sortByDateDesc(filtered);

  // Pagination
  const pageNum = Math.max(1, parseInt(String(page), 10));
  const pageSize = Math.max(1, parseInt(String(limit), 10));
  const start = (pageNum - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  res.json({
    data: paginated,
    page: pageNum,
    hasMore: start + pageSize < filtered.length,
    total: filtered.length,
  });
};

// Get single news by ID
export const getNewsById = (req: Request, res: Response) => {
  const article = getArticles().find((a) => a.id === req.params.id);
  if (!article) return res.status(404).json({ message: "Article not found" });
  res.json(article);
};

// --- Breaking News ---
export const getBreakingNews = (req: Request, res: Response) => {
  const { limit = PAGE_LIMIT } = req.query;
  const breaking = sortByDateDesc(getCachedArticles()).slice(
    0,
    parseInt(String(limit), PAGE_LIMIT)
  );
  res.json({ data: breaking });
};

// --- Trending News ---
export const getTrendingNews = (req: Request, res: Response) => {
  const { limit = PAGE_LIMIT } = req.query;
  const articles = getCachedArticles();

  const groups: Article[][] = [];

  for (const article of articles) {
    const normTitle = normalizePersian(article.title);

    let foundGroup = false;

    for (const group of groups) {
      const representative = normalizePersian(group[0].title);
      const similarity = stringSimilarity.compareTwoStrings(
        normTitle,
        representative
      );

      if (similarity >= 0.7) {
        group.push(article);
        foundGroup = true;
        break;
      }
    }

    if (!foundGroup) {
      groups.push([article]);
    }
  }

  // Pick groups that appear in multiple sources
  const trending = groups
    .filter((g) => g.length > 1)
    .map((g) => g[0]) // take representative article
    .slice(0, parseInt(String(limit), PAGE_LIMIT));

  res.json({ data: trending });
};

// --- Hero Section News (4 important) ---
export const getHeroNews = (req: Request, res: Response) => {
  // take top 4 breaking news
  const hero = sortByDateDesc(getCachedArticles()).slice(0, 4);
  res.json({ data: hero });
};

export const incrementArticleViews = (req: Request, res: Response) => {
  const article = getArticles().find((a) => a.id === req.params.id);
  if (!article) return res.status(404).json({ message: "Article not found" });

  article.views = (article.views || 0) + 1;

  res.json({ views: article.views });
};
