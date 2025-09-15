import Parser from "rss-parser";
import { v4 as uuid } from "uuid";
import { Article, FeedNews } from "../types/types";

const parser = new Parser<any>({
  customFields: {
    item: ["enclosure", "category", "content:encoded", "source"],
  },
});

export async function scrapeMashregh(feed: FeedNews): Promise<Article[]> {
  const rss = await parser.parseURL(feed.url);

  return rss.items.map((item: any): Article => {
    const category =
      typeof item.category === "string"
        ? item.category.split(">")[0].trim()
        : feed.category;

    return {
      id: uuid(),
      title: item.title || "بدون عنوان",
      description: item.description || "",
      category,
      subcategory: feed.subcategory,
      publishedAt: item.pubDate
        ? new Date(item.pubDate).toISOString()
        : new Date().toISOString(),
      readTime: "3",
      content: item["content:encoded"] || "",
      imageUrl: item.enclosure?.url || "",
      source: feed.source,
      sourceLink: item.link || "",
    };
  });
}
