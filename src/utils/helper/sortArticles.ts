import { Article } from "../../types/types";

export function sortByDateDesc(articles: Article[]) {
  return [...articles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function sortByDateAsc(articles: Article[]) {
  return [...articles].sort(
    (a, b) =>
      new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
  );
}