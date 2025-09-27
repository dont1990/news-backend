// scrapers/khabaronline.ts
import Parser from "rss-parser";
import { v4 as uuid } from "uuid";
import { Article, FeedNews } from "../types/types";
import { getCategory } from "../utils/helper/getCategory";
import { calcReadTime } from "../utils/helper/calcReadTime";
import { extractTags } from "../utils/helper/extractTags";

const parser = new Parser<any>({
  customFields: {
    item: ["enclosure", "category", "content:encoded", "source", "description"],
  },
});

export async function scrapeKhabarOnline(feed: FeedNews): Promise<Article[]> {
  try {
    const rss = await parser.parseURL(feed.url);

    return rss.items.map((item: any): Article => {
      // Use getCategory to normalize
      const category = getCategory(item, feed);
      const subcategory = feed.subcategory; // optional: you can extract from item if needed

      const imageUrl = item.enclosure?.url || "";

      // Description fallback chain
      const description =
        item.description || item["content:encoded"] || "";

      return {
        id: uuid(),
        title: item.title || "بدون عنوان",
        description,
        category,
        subcategory,
        publishedAt: item.pubDate
          ? new Date(item.pubDate).toISOString()
          : new Date().toISOString(),
        readTime: calcReadTime(description),
        imageUrl,
        source: item.source || feed.source,
        sourceLink: item.link || "",
        tags: extractTags(`${item.title} ${description}`),
      };
    });
  } catch (err) {
    console.error(`❌ Failed to fetch KhabarOnline feed ${feed.url}:`, err);
    return [];
  }
}
