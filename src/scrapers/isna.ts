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

export async function scrapeIsna(feed: FeedNews): Promise<Article[]> {
  try {
    const rss = await parser.parseURL(feed.url);

    const articles: Article[] = rss.items.map((item) => {
      // handle category
      const category = getCategory(item, feed);

      // use enclosure or media:content for images
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

    return articles;
  } catch (err) {
    console.error(`❌ Failed to fetch ISNA feed ${feed.url}:`, err);
    return [];
  }
}
