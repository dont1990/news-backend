// scrapers/irna.ts
import Parser from "rss-parser";
import { Article, FeedNews } from "../types/types";
import { v4 as uuid } from "uuid";
import { extractImage } from "../utils/helper/extractImage";
import { getCategory } from "../utils/helper/getCategory";
import { calcReadTime } from "../utils/helper/calcReadTime";
import { extractTags } from "../utils/helper/extractTags";

const parser = new Parser<Article>({
  customFields: {
    item: ["creator", "category", "categories", "enclosure", "media:content"],
  },
});

export async function scrapeIrna(feed: FeedNews): Promise<Article[]> {
  try {
    const rss = await parser.parseURL(feed.url);

    return rss.items.map((item) => {
      const category = getCategory(item, feed);

      const imageUrl =
        (item as any).enclosure?.url ||
        (item as any)["media:content"]?.["$"]?.url ||
        "";

      return {
        id: uuid(),
        title: item.title || "No title",
        description: item.contentSnippet || item.content || "",
        author: item.creator || feed.source,
        category,
        subcategory: feed.subcategory,
        publishedAt: item.pubDate
          ? new Date(item.pubDate).toISOString()
          : new Date().toISOString(),
        readTime: calcReadTime(item.contentSnippet || item.content || ""),
        imageUrl: extractImage(item) || imageUrl,
        source: feed.source,
        sourceLink: item.link || "",
        tags: extractTags(`${item.title} ${item.contentSnippet}`),
      };
    });
  } catch (err) {
    console.error(`❌ Failed to fetch IRNA feed ${feed.url}:`, err);
    return [];
  }
}
