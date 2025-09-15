export function extractImage(item: any): string {
  if (item["itunes:image"]?.href) return item["itunes:image"].href;
  if (item["media:content"]?.url) return item["media:content"].url;
  if (item["media:content"]?.["$"]?.url) return item["media:content"]["$"].url;

  if (item.enclosure) {
    if (Array.isArray(item.enclosure)) {
      const first = item.enclosure[0];
      if (first?.url) return first.url;
      if (first?.["$"]?.url) return first["$"].url;
    } else {
      if (item.enclosure.url) return item.enclosure.url;
      if (item.enclosure["$"]?.url) return item.enclosure["$"].url;
    }
  }

  // 🔥 fallback: try to grab <img> from description/content
  const html = item["content:encoded"] || item.content || item.description;
  if (html) {
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (match) return match[1];
  }

  return ""; // final fallback
}
