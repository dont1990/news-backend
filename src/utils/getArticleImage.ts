import axios from "axios";
import cheerio from "cheerio";

export async function getArticleImage(url: string): Promise<string> {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // 1. Try Open Graph first
    let img = $('meta[property="og:image"]').attr("content");
    if (img) return img;

    // 2. Try main figure.img
    img = $('figure.item-img img').attr("src");
    if (img) return img;

    // 3. Fallback: first <p><img> in the article body
    img = $('.item-body img').first().attr("src");
    return img || "";
  } catch (err) {
    console.error("Failed to fetch image:", err);
    return "";
  }
}
