import { Article } from "../../types/types";

export function dedupeArticles(articles: Article[]): Article[] {
  const map = new Map<string, Article>();
  articles.forEach((article) => {
    if (article.sourceLink) {
      map.set(article.sourceLink, article); // last one wins
    } else {
      // fallback if no link
      map.set(article.id, article);
    }
  });
  return Array.from(map.values());
}
