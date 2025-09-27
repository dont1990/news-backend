import { feeds } from "../config/feedsConfig";
import { scrapeGeneric } from "../scrapers";
import { scrapeIrna } from "../scrapers/irna";
import { scrapeIsna } from "../scrapers/isna";
import { scrapeMashregh } from "../scrapers/mashregh";
import { dedupeArticles } from "../utils/helper/dedupeArticles";
import { Article, FeedNews } from "../types/types";
import { scrapeShahreKhabar } from "../scrapers/shahrkhabar";
import { scrapeKhabarOnline } from "../scrapers/khabarOnline";

const scrapers: Record<string, (feed: FeedNews) => Promise<Article[]>> = {
  "ایسنا": scrapeIsna,
  "مشرق": scrapeMashregh,
  "ایرنا": scrapeIrna,
  "شهر خبر": scrapeShahreKhabar,
  "خبرآنلاین": scrapeKhabarOnline,
};

export async function scrapeNews() {
  const all = await Promise.all(
    feeds.map(async (feed) => {
      try {
        const scraper = scrapers[feed.source] || scrapeGeneric;
        
        return await scraper(feed);
      } catch (e) {
        console.error(`❌ Failed ${feed.source}:`, e);
        return [];
      }
    })
  );
  return dedupeArticles(all.flat());
}

