import cron from "node-cron";
import { scrapeNews } from "../services/scrapeNews";
import { writeJson } from "../utils/fileDb";
import { Article } from "../types/types";

const articlesFile = "articles.json";

let cachedArticles: Article[] = [];

cron.schedule("*/5 * * * * *", async () => { // every 10 minutes
  const news = await scrapeNews();
  if (news.length > 0) {
    cachedArticles = news;
    writeJson(articlesFile, news);
    console.log("📰 Articles updated");
  }
});

export function getCachedArticles() {
  return cachedArticles;
}
