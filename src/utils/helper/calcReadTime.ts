// utils/helper/calcReadTime.ts
export function calcReadTime(text: string, wpm = 200): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wpm));
  return String(minutes);
}
