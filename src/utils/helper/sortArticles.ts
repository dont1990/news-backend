import { Article } from "../../types/types";

// Sort by publishedAt descending (newest first)
export function sortByDateDesc(articles: Article[]) {
  return [...articles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

// Sort by publishedAt ascending (oldest first)
export function sortByDateAsc(articles: Article[]) {
  return [...articles].sort(
    (a, b) =>
      new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
  );
}

// Sort by views descending (most viewed first)
export function sortByViewsDesc(articles: Article[]) {
  return [...articles].sort((a, b) => (b.views || 0) - (a.views || 0));
}

// Sort by views ascending (least viewed first)
export function sortByViewsAsc(articles: Article[]) {
  return [...articles].sort((a, b) => (a.views || 0) - (b.views || 0));
}
