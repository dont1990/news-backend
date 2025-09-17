import Parser from "rss-parser";
import { v4 as uuid } from "uuid";
import { Article, FeedNews } from "../types/types";
import { getCategory } from "../utils/helper/getCategory";
import { calcReadTime } from "../utils/helper/calcReadTime";
import { extractTags } from "../utils/helper/extractTags";

const parser = new Parser<any>({
  customFields: {
    item: ["enclosure", "category", "content:encoded", "source"],
  },
});

export async function scrapeMashregh(feed: FeedNews): Promise<Article[]> {
  const rss = await parser.parseURL(feed.url);

  return rss.items.map((item: any): Article => {
    const category = getCategory(item, feed);

    // Prefer content:encoded → fallback to content → fallback to contentSnippet
    const rawContent = item["content:encoded"]?.trim();
    const content =
      rawContent && rawContent.length > 0
        ? rawContent
        : item.content || item.contentSnippet || "";

    // For description, fallback chain too
    const description =
      item.description || item.contentSnippet || item.content || "";

    return {
      id: uuid(),
      title: item.title || "بدون عنوان",
      description,
      category,
      subcategory: feed.subcategory,
      publishedAt: item.pubDate
        ? new Date(item.pubDate).toISOString()
        : new Date().toISOString(),
      readTime: calcReadTime(item.contentSnippet || item.content || ""),
      imageUrl: item.enclosure?.url || "",
      source: feed.source,
      sourceLink: item.link || "",
      tags: extractTags(`${item.title} ${item.contentSnippet}`)
    };
  });
}
