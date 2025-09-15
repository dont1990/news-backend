// utils/helper/getCategory.ts
import { FeedNews } from "../../types/types";

export function getCategory(item: any, feed: FeedNews): string {
  if (item.categories?.length) {
    let firstCat = item.categories[0];
    if (typeof firstCat === "string") return firstCat.split(">")[0].trim();
    if ((firstCat as any)?._) return (firstCat as any)._.split(">")[0].trim();
  }

  if (item.category) {
    const cat = typeof item.category === "string" ? item.category : (item.category as any)?._;
    if (cat) return cat.split(">")[0].trim();
  }

  if (feed.category) {
    return feed.category.split(">")[0].trim();
  }

  return "همه"; // fallback
}
