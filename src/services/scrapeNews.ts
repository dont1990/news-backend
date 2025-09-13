import Parser from "rss-parser";
import { Article } from "../types/types";
import { v4 as uuid } from "uuid";

export async function scrapeNews(): Promise<Article[]> {
  const parser = new Parser<Article>({
    customFields: {
      item: ["creator", "category", "media:content"],
    },
  });

  const feed = await parser.parseURL("https://www.mehrnews.com/rss");

  const articles: Article[] = feed.items.map((item) => {
    // Safely get the first category if exists, otherwise fallback
    const category =
      item.categories?.[0] ?? item.category ?? "all";

    // Optional: get image from media:content
    let imageUrl = "";
    if ((item as any)["media:content"]?.["$"]?.url) {
      imageUrl = (item as any)["media:content"]["$"].url;
    }

    return {
      id: uuid(),
      title: item.title || "No title",
      category:'all',
      description: item.contentSnippet || "",
      author: item.creator || "Mehr News",
      publishedAt: item.pubDate
        ? new Date(item.pubDate).toISOString()
        : new Date().toISOString(),
      readTime: "3",
      content: item.content || "",
      imageUrl,
      source: "Mehr News",
      sourceLink: item.link || "",
    };
  });

  console.log(`📰 RSS scraper: Fetched ${articles.length} articles`);
  console.log(articles)
  return articles;
}
