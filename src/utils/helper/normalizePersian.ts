export function normalizePersian(text: string): string {
  return text
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[‌‍‎‏]/g, "") // remove zero-width chars
    .replace(/َ|ً|ُ|ٌ|ِ|ٍ|ْ|ّ/g, "") // remove diacritics
    .toLowerCase()
    .trim();
}