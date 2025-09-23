// scrapers/jaaar.ts
import axios from "axios";
import * as cheerio from "cheerio";
import { Newspaper } from "../types/types";
import { v4 as uuid } from "uuid";

export async function scrapeJaaar(): Promise<Newspaper[]> {
  const url = "https://www.jaaar.com/kiosk"; // today’s page
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const papers: Newspaper[] = [];

  $(".element-item.issue").each((_, el) => {
    const name = $(el).find(".content.source-title .rtl").text().trim();
    const date = $(el).find(".content.source-title span").last().text().trim();
    const link = $(el).find(".view a.view").attr("href") || "";
    const imageUrl =
      $(el).find(".image img").attr("data-full-image") ||
      $(el).find(".image img").attr("src") ||
      "";

    papers.push({
      id: uuid(),
      name,
      date,
      headline: '', // optional, jaaar doesn’t expose directly
      imageUrl,
      link,
    });
  });

  return papers;
}
