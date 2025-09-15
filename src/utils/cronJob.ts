import cron from "node-cron";
import { scrapeNews } from "../services/rssService";
import { writeJson, readJson } from "./fileDb";
import { Article } from "../types/types";

const articlesFile = "articles.json";

let cachedArticles: Article[] = [];

// Schedule: every 10 minutes
cron.schedule("*/20 * * * *", async () => {
  console.log("🔄 Updating articles...");
  try {
    const news = await scrapeNews();
    if (news.length > 0) {
      cachedArticles = news;
      writeJson(articlesFile, news);
      console.log(`📰 Articles updated. Total: ${news.length}`);
    }
  } catch (err) {
    console.error("❌ Error updating articles:", err);
  }
});

export function getCachedArticles() {
  if (cachedArticles.length > 0) return cachedArticles;

  try {
    cachedArticles = readJson<Article[]>(articlesFile);
    return cachedArticles;
  } catch {
    return [];
  }
}
