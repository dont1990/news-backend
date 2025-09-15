import Parser from "rss-parser";
import { Article, FeedNews } from "../types/types";
import { v4 as uuid } from "uuid";
import { extractImage } from "../utils/helper/extractImage";

export async function scrapeGeneric(feed: FeedNews): Promise<Article[]> {
  const parser = new Parser<Article>({
    customFields: {
      item: [
        "creator",
        "category",
        "categories",
        "enclosure",
        "media:content",
        "itunes:image",
      ],
    },
  });

  try {
    const rss = await parser.parseURL(feed.url);

    return rss.items.map((item) => {
      let category = feed.category || "همه";
      if (item.category) {
        category =
          typeof item.category === "string"
            ? item.category.split(">")[0].trim()
            : (item.category as any)?._;
      }

      const imageUrl =
        (item as any).enclosure?.url ||
        (item as any)["media:content"]?.["$"]?.url ||
        (item as any)["itunes:image"]?.href ||
        extractImage(item) ||
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
        readTime: "3",
        content: item.content || "",
        imageUrl,
        source: feed.source,
        sourceLink: item.link || "",
      };
    });
  } catch (err) {
    console.error(`❌ Failed to fetch feed ${feed.source}:`, err);
    return [];
  }
}
