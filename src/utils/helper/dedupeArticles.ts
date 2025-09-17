import { Article } from "../../types/types";

function getArticleKey(article: Article): string {
  if (article.sourceLink) {
    return article.sourceLink.trim().toLowerCase();
  }

  const title = article.title?.trim().toLowerCase() || "";
  const published = article.publishedAt
    ? new Date(article.publishedAt).toISOString().split("T")[0] // date only
    : "";
  return `${title}-${published}`;
}

export function dedupeArticles(articles: Article[]): Article[] {
  const map = new Map<string, Article>();

  articles.forEach((article) => {
    const key = getArticleKey(article);

    // Last one wins → if same article appears twice, newer scrape replaces older
    map.set(key, article);
  });

  return Array.from(map.values());
}
