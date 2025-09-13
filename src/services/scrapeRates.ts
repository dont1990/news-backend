import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { Rate, Rates } from "../types/types";

export async function scrapeRates(): Promise<Rates | null> {
  try {
    const res = await fetch("https://www.tgju.org/");
    const html = await res.text();
    const $ = cheerio.load(html);

    function parseRate(selector: string): Rate {
      const price = $(selector).find(".info-price").text().trim();
      const change = $(selector).find(".info-change").text().trim();
      return { value: price, change };
    }

    const rates: Rates = {
      dollar: parseRate("#l-price_dollar_rl"),
      gold: parseRate("#l-geram18"),
      tsetmc: parseRate("#l-gc30"), // بورس index
      coin: parseRate("#l-sekee"),
      updatedAt: new Date(),
    };

    return rates;
  } catch (err) {
    console.error("Failed to scrape rates:", err);
    return null;
  }
}
