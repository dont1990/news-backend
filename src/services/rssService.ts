// import Parser from "rss-parser";
// import { Article } from "../types/types";
// import { v4 as uuid } from "uuid";
// import { feeds } from "../config/feedsConfig";
// import { writeJson } from "../utils/fileDb";
// import { extractImage } from "../helper/extractImage";

// const parser = new Parser<Article>({
//   customFields: {
//     item: [
//       "creator",
//       "category",
//       "categories",
//       "media:content",
//       "itunes:summary",
//       "itunes:image",
//       "enclosure",
//       "itunes:duration",
//     ],
//   },
// });

// export async function scrapeNews(): Promise<Article[]> {
//   const allArticles: Article[] = [];
//   const rssCategories = new Set<string>();

//   for (const feed of feeds) {
//     try {
//       const rss = await parser.parseURL(feed.url);

//       const articles = rss.items.map((item) => {
//         let category = "همه"; // fallback

//         if (item.categories?.length) {
//           let firstCat = item.categories[0];
//           if (typeof firstCat === "string")
//             firstCat = firstCat.split(">")[0].trim();
//           else if ((firstCat as any)?._)
//             firstCat = (firstCat as any)._.split(">")[0].trim();
//           category = firstCat;
//         } else if (item.category) {
//           let cat =
//             typeof item.category === "string"
//               ? item.category
//               : (item.category as any)?._;
//           if (cat) category = cat.split(">")[0].trim();
//         } else if (feed.category) {
//           category = feed.category.split(">")[0].trim();
//         }

//         rssCategories.add(category); // <-- track all categories

//         // ... rest of your article mapping
//         return {
//           id: uuid(),
//           title: item.title || "No title",
//           description:
//             item.contentSnippet || item["itunes:summary"] || item.content || "",
//           author: item.creator || feed.source,
//           category,
//           subcategory: feed.subcategory,
//           publishedAt: item.pubDate
//             ? new Date(item.pubDate).toISOString()
//             : new Date().toISOString(),
//           readTime: "3",
//           content: item.content || "",
//           imageUrl: extractImage(item),
//           source: feed.source,
//           sourceLink: item.link || "",
//         };
//       });

//       allArticles.push(...articles);
//     } catch (err) {
//       console.error(`❌ Failed to fetch ${feed.source}:`, err);
//     }
//   }

//   // Deduplicate by sourceLink
//   const deduped = Array.from(
//     new Map(allArticles.map((a) => [a.sourceLink, a])).values()
//   );

//   // Optional: store rssCategories somewhere for filters
//   writeJson("rssCategories.json", Array.from(rssCategories));

//   return deduped;
// }

import { feeds } from "../config/feedsConfig";
import { scrapeGeneric } from "../scrapers";
import { scrapeIrna } from "../scrapers/irna";
import { scrapeIsna } from "../scrapers/isna";
import { scrapeMashregh } from "../scrapers/mashregh";
import { dedupeArticles } from "../utils/helper/dedupeArticles";
import { Article, FeedNews } from "../types/types";

export async function scrapeNews(): Promise<Article[]> {
  const all: Article[] = [];

  for (const feed of feeds) {
    try {
      console.log(`📰 Scraping ${feed.source} (${feed.url})`);
      let articles: Article[] = [];

      if (feed.source === "ایسنا") {
        articles = await scrapeIsna(feed);
      } else if (feed.source === "مشرق") {
        articles = await scrapeMashregh(feed);
      } else if (feed.source === "ایرنا") {
        articles = await scrapeIrna(feed);
      } else if (feed.source === "شهر خبر") {
        articles = await scrapeShahreKhabar(feed);
      } else {
        articles = await scrapeGeneric(feed); // fallback
      }

      all.push(...articles);
    } catch (e) {
      console.error(`❌ Failed ${feed.source}:`, e);
    }
  }

  return dedupeArticles(all);
}

function scrapeShahreKhabar(
  feed: FeedNews
): Article[] | PromiseLike<Article[]> {
  throw new Error("Function not implemented.");
}
