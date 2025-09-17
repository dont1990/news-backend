// utils/helper/extractImage.ts
export function extractImage(item: any): string {
  if (item["itunes:image"]?.href) return item["itunes:image"].href;
  if (item["media:content"]?.url) return item["media:content"].url;
  if (item["media:content"]?.["$"]?.url) return item["media:content"]["$"].url;

  if (item.enclosure) {
    const enclosures = Array.isArray(item.enclosure) ? item.enclosure : [item.enclosure];
    for (const enc of enclosures) {
      if (enc?.url) return enc.url;
      if (enc?.["$"]?.url) return enc["$"].url;
    }
  }

  // 🔥 fallback: regex on HTML
  const html = item["content:encoded"] || item.content || item.description;
  if (html) {
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (match) return match[1];
  }

  // Last fallback
  return "";
}
