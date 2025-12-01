// utils/helper/getCategory.ts
import { FeedNews } from "../../types/types";

const CATEGORY_MAP: Record<string, string> = {
  فناوری: "فناوری",
  "اخبار دانش و فناوری": "فناوری",
  تکنولوژی: "فناوری",
  ورزشی: "ورزشی",
  "اخبار ورزشی": "ورزشی",
  سیاست: "سیاست",
  "اخبار سیاسی": "سیاست",
  "فرهنگ و هنر": "فرهنگ و هنر",
  فرهنگی: "فرهنگ و هنر",
  هنری: "فرهنگ و هنر",
  اقتصاد: "اقتصاد",
  اقتصادی: "اقتصاد",
  حوادث: "حوادث",
  جهان: "جهان",
};

function normalizeCategory(cat: string) {
  return CATEGORY_MAP[cat.trim()] || cat.trim();
}

export function getCategory(item: any, feed: FeedNews): string {
  let cat = "";

  if (item.categories?.length) {
    let firstCat = item.categories[0];
    if (typeof firstCat === "string") cat = firstCat.split(">")[0].trim();
    else if ((firstCat as any)?._)
      cat = (firstCat as any)._.split(">")[0].trim();
  }

  if (!cat && item.category) {
    cat =
      typeof item.category === "string"
        ? item.category
        : (item.category as any)?._;
    if (cat) cat = cat.split(">")[0].trim();
  }

  if (!cat && feed.category) {
    cat = feed.category.split(">")[0].trim();
  }

  if (!cat) return "همه";

  return normalizeCategory(cat);
}
