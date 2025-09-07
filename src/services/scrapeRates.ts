// src/services/scrapeRates.ts
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { Rate, Rates } from "../types/types";

export async function scrapeRates(): Promise<Rates | null> {
  try {
    const res = await fetch("https://www.tgju.org/");
    const html = await res.text();
    const $ = cheerio.load(html);

    function parseRate(selector: string): Rate {
      const raw = $(selector).text().trim();
      const match = raw.match(/[\d,]+/g);
      return {
        value: match ? match[0] : "",
        change: match && match[1] ? match[1] : "",
      };
    }

    const rates: Rates = {
      dollar: parseRate("#l-price_dollar_rl"),
      gold: parseRate("#l-geram18"),
      pound: parseRate("#l-price_pound_rl"),
      coin: parseRate("#l-sell_coin"),
      updatedAt: new Date(),
    };

    return rates;
  } catch (err) {
    console.error("Failed to scrape rates:", err);
    return null;
  }
}
