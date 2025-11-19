export function getSource(itemSource?: string, feedSource?: string) {
  if (itemSource && itemSource !== "بدون منبع") return itemSource;
  return feedSource ?? "بدون منبع";
}
