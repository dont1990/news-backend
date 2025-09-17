import Parser from "rss-parser";
import { Article, FeedNews } from "../types/types";
import { v4 as uuid } from "uuid";
import { getCategory } from "../utils/helper/getCategory";
import { calcReadTime } from "../utils/helper/calcReadTime";
import { extractTags } from "../utils/helper/extractTags";

const parser = new Parser<Article>({
  customFields: {
    item: ["creator", "category", "enclosure"],
  },
});

export async function scrapeShahreKhabar(feed: FeedNews): Promise<Article[]> {
  try {
    const rss = await parser.parseURL(feed.url);

    const articles: Article[] = rss.items.map((item) => {
      const category = getCategory(item, feed);
      return {
        id: uuid(),
        title: item.title || "No title",
        description:
          item.contentSnippet || item.content || item.description || "",
        author: item.creator || item.author || feed.source,
        category,
        subcategory: feed.subcategory,
        publishedAt: item.pubDate
          ? new Date(item.pubDate).toISOString()
          : new Date().toISOString(),
        readTime: calcReadTime(item.contentSnippet || item.content || ""),
        imageUrl: item.enclosure?.url || "",
        source: feed.source,
        sourceLink: item.link || "",
        tags: extractTags(`${item.title} ${item.contentSnippet}`),
      };
    });

    return articles;
  } catch (err) {
    console.error(`❌ Failed to fetch ${feed.source}:`, err);
    return [];
  }
}
