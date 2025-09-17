import keyword_extractor from "keyword-extractor";

// Persian stopwords & common verbs
const stopwords = new Set([
  "از",
  "به",
  "در",
  "با",
  "که",
  "را",
  "برای",
  "یک",
  "می",
  "شود",
  "کرد",
  "است",
  "و",
  "یا",
  "اما",
  "این",
  "آن",
  "های",
  "ها",
  "بر",
  "هم",
]);

const verbEndings = ["دارد", "می‌کند", "کرده‌اند", "می‌شود", "می‌آید", "گذرد"];

/**
 * Extract meaningful tags from Persian text
 * @param text Title + description
 * @param max Maximum number of tags to return
 */
export function extractTags(text: string, max = 5): string[] {
  if (!text) return [];

  const candidates = keyword_extractor.extract(text, {
    language: "fa",
    remove_digits: false,
    return_changed_case: false,
    remove_duplicates: true,
  });

  const cleaned = candidates
    .map((w) => stemPersian(w))
    .filter((w) => {
      if (!w) return false;
      if (stopwords.has(w)) return false;
      if (verbEndings.some((e) => w.endsWith(e))) return false;
      if (w.length < 3) return false;
      if (/^\d+$/.test(w) && w.length !== 4) return false;
      return true;
    });

  const ranked = cleaned.sort((a, b) => b.length - a.length);

  return ranked.slice(0, max);
}

/**
 * Simple Persian stemmer for tags
 * Removes common suffixes like -ها, -هایی, -تر, -ترین, -ان
 */
export function stemPersian(word: string): string {
  if (!word) return "";
  let w = word;

  // common plural/possessive suffixes
  const suffixes = ["هایی", "های", "ها", "تر", "ترین", "ان", "ات"];
  for (const suffix of suffixes) {
    if (w.endsWith(suffix) && w.length > suffix.length + 2) {
      // keep min length 3
      w = w.slice(0, -suffix.length);
      break;
    }
  }

  // remove trailing punctuation just in case
  w = w.replace(/^[\s\|:\/]+|[\s\|:\/]+$/g, "").trim();

  return w;
}
