import { FeedNews } from "../types/types";

export const feeds: FeedNews[] = [
  // Mashregh
  {
    url: "https://www.mashreghnews.ir/rss-homepage",
    source: "Mashregh",
    category: "عمومی",
  },
  {
    url: "https://www.mashreghnews.ir/rss",
    source: "Mashregh",
    category: "عمومی",
  },
  {
    url: "https://www.mashreghnews.ir/rss/pl/69",
    source: "Mashregh",
    category: "فرهنگی",
  },
  {
    url: "https://www.mashreghnews.ir/rss/pl/20",
    source: "Mashregh",
    category: "فرهنگی",
  },

  // ISNA
  {
    url: "https://www.isna.ir/rss-homepage",
    source: "ISNA",
    category: "عمومی",
  },
  {
    url: "https://www.isna.ir/rss/tp/14",
    source: "ISNA",
    category: "اجتماعی",
  },
  {
    url: "https://www.isna.ir/rss/tp/5",
    source: "ISNA",
    category: "علمی و دانشگاهی",
  },
  {
    url: "https://www.isna.ir/rss/tp/24",
    source: "ISNA",
    category: "ورزش",
  },
  {
    url: "https://www.isna.ir/rss/tp/20",
    source: "ISNA",
    category: "فرهنگ و هنر",
  },

  // IRNA
  {
    url: "https://www.irna.ir/rss-homepage",
    source: "IRNA",
    category: "عمومی",
  },
  {
    url: "https://www.irna.ir/rss/tp/5",
    source: "IRNA",
    category: "سیاست",
    subcategory: "عمومی",
  },
  {
    url: "https://www.irna.ir/rss/tp/8",
    source: "IRNA",
    category: "سیاست",
    subcategory: "مجلس",
  },
  {
    url: "https://www.irna.ir/rss/tp/20",
    source: "IRNA",
    category: "اقتصاد",
  },
  {
    url: "https://www.irna.ir/rss/tp/14",
    source: "IRNA",
    category: "ورزش",
  },

  // Podcasts
  {
    url: "https://rss.castbox.fm/everest/3e1f37a1d33448bfbf2b11c1caa98ae4.xml",
    source: "Castbox",
    category: "پادکست",
  },
];
