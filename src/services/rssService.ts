import Parser from "rss-parser";
import { Article } from "../types/types";
import { v4 as uuid } from "uuid";
import { feeds } from "../config/feedsConfig";

const parser = new Parser<Article>({
  customFields: { item: ["creator", "category", "media:content"] }
});

export async function scrapeNews(): Promise<Article[]> {
  const allArticles: Article[] = [];

  for (const feed of feeds) {
    try {
      const rss = await parser.parseURL(feed.url);

      const articles = rss.items.map(item => {
        // Category
        const category = item.categories?.[0] ?? item.category ?? feed.category ?? "all";

        // Image fallback
        let imageUrl = "";
        if ((item as any)["media:content"]?.["$"]?.url) {
          imageUrl = (item as any)["media:content"]["$"].url;
        } else if ((item as any).enclosure?.url) {
          imageUrl = (item as any).enclosure.url;
        }

        return {
          id: uuid(),
          title: item.title || item.name || "No title",
          description: item.contentSnippet || "",
          author: item.creator || feed.source,
          category,
          subcategory: feed.subcategory,
          publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
          readTime: "3",
          content: item.content || "",
          imageUrl,
          source: feed.source,
          sourceLink: item.link || ""
        };
      });

      allArticles.push(...articles);
      console.log(`📰 Fetched ${articles.length} articles from ${feed.source}`);
    } catch (err) {
      console.error(`❌ Failed to fetch ${feed.source}:`, err);
    }
  }

  // Deduplicate by sourceLink
  const deduped = Array.from(new Map(allArticles.map(a => [a.sourceLink, a])).values());

  return deduped;
}
