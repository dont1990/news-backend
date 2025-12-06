import { FEED_BASE_URLS } from "../constants/feed-sites";
import { FeedNews } from "../types/types";

export const feeds: FeedNews[] = [
  // Mashregh
  // {
  //   url: `${FEED_BASE_URLS.MASHREGH}-homepage`,
  //   source: "مشرق",
  //   category: "عمومی",
  // },
  // {
  //   url: `${FEED_BASE_URLS.MASHREGH}`,
  //   source: "مشرق",
  //   category: "عمومی",
  // },
  // {
  //   url: `${FEED_BASE_URLS.MASHREGH}/pl/69`,
  //   source: "مشرق",
  //   category: "فرهنگی",
  // },
  // {
  //   url: `${FEED_BASE_URLS.MASHREGH}/pl/20`,
  //   source: "مشرق",
  //   category: "فرهنگی",
  // },

  // ISNA
  // {
  //   url: `${FEED_BASE_URLS.ISNA}-homepage`,
  //   source: "ایسنا",
  //   category: "عمومی",
  // },
  // {
  //   url: `${FEED_BASE_URLS.ISNA}/tp/14`,
  //   source: "ایسنا",
  //   category: "اجتماعی",
  // },
  // {
  //   url: `${FEED_BASE_URLS.ISNA}/tp/5`,
  //   source: "ایسنا",
  //   category: "علمی و دانشگاهی",
  // },
  // {
  //   url: `${FEED_BASE_URLS.ISNA}/tp/24`,
  //   source: "ایسنا",
  //   category: "ورزشی",
  // },
  // {
  //   url: `${FEED_BASE_URLS.ISNA}/tp/20`,
  //   source: "ایسنا",
  //   category: "فرهنگ و هنر",
  // },

  // IRNA
  // {
  //   url: `${FEED_BASE_URLS.IRNA}-homepage`,
  //   source: "ایرنا",
  //   category: "عمومی",
  // },
  // {
  //   url: `${FEED_BASE_URLS.IRNA}/tp/5`,
  //   source: "ایرنا",
  //   category: "سیاست",
  //   subcategory: "عمومی",
  // },
  // {
  //   url: `${FEED_BASE_URLS.IRNA}/tp/8`,
  //   source: "ایرنا",
  //   category: "سیاست",
  //   subcategory: "مجلس",
  // },
  // {
  //   url: `${FEED_BASE_URLS.IRNA}/tp/20`,
  //   source: "ایرنا",
  //   category: "اقتصاد",
  // },
  // {
  //   url: `${FEED_BASE_URLS.IRNA}/tp/14`,
  //   source: "ایرنا",
  //   category: "ورزشی",
  // },

  // ShahreKhabar
  // {
  //   url: `${FEED_BASE_URLS.SHAHREKHABAR}?type=3`,
  //   source: "شهر خبر",
  //   category: "سیاسی",
  // },
  // {
  //   url: `${FEED_BASE_URLS.SHAHREKHABAR}?type=8`,
  //   source: "شهر خبر",
  //   category: "ورزشی",
  // },
  // {
  //   url: `${FEED_BASE_URLS.SHAHREKHABAR}?type=4`,
  //   source: "شهر خبر",
  //   category: "اقتصادی",
  // },
  // {
  //   url: `${FEED_BASE_URLS.SHAHREKHABAR}?type=5`,
  //   source: "شهر خبر",
  //   category: "حوادث",
  // },
  // {
  //   url: `${FEED_BASE_URLS.SHAHREKHABAR}?type=13`,
  //   source: "شهر خبر",
  //   category: "فرهنگی",
  // },
  // {
  //   url: `${FEED_BASE_URLS.SHAHREKHABAR}?type=7`,
  //   source: "شهر خبر",
  //   category: "هنری",
  // },
  // {
  //   url: `${FEED_BASE_URLS.SHAHREKHABAR}?type=2`,
  //   source: "شهر خبر",
  //   category: "جهان",
  // },

  // KhabarOnline - فناوری
  {
    url: `${FEED_BASE_URLS.KHABARONLINE}/tp/7`,
    source: "خبرآنلاین",
    category: "فناوری",
  },
  {
    url: `${FEED_BASE_URLS.KHABARONLINE}/tp/1386`,
    source: "خبرآنلاین",
    category: "فناوری",
    subcategory: "استارت آپ",
  },
  {
    url: `${FEED_BASE_URLS.KHABARONLINE}/tp/1387`,
    source: "خبرآنلاین",
    category: "فناوری",
    subcategory: "خودرو",
  },
  {
    url: `${FEED_BASE_URLS.KHABARONLINE}/tp/1388`,
    source: "خبرآنلاین",
    category: "فناوری",
    subcategory: "شبه علم",
  },
  {
    url: `${FEED_BASE_URLS.KHABARONLINE}/tp/72`,
    source: "خبرآنلاین",
    category: "فناوری",
    subcategory: "نجوم",
  },
  {
    url: `${FEED_BASE_URLS.KHABARONLINE}/tp/77`,
    source: "خبرآنلاین",
    category: "فناوری",
    subcategory: "اینترنت",
  },
  {
    url: `${FEED_BASE_URLS.KHABARONLINE}/tp/1391`,
    source: "خبرآنلاین",
    category: "فناوری",
    subcategory: "جنگ افزار",
  },
  {
    url: `${FEED_BASE_URLS.KHABARONLINE}/tp/73`,
    source: "خبرآنلاین",
    category: "فناوری",
    subcategory: "پزشکی",
  },
  {
    url: `${FEED_BASE_URLS.KHABARONLINE}/tp/74`,
    source: "خبرآنلاین",
    category: "فناوری",
    subcategory: "فناوری",
  },
  {
    url: `${FEED_BASE_URLS.KHABARONLINE}/tp/79`,
    source: "خبرآنلاین",
    category: "فناوری",
    subcategory: "بازی",
  },
  {
    url: `${FEED_BASE_URLS.KHABARONLINE}/tp/75`,
    source: "خبرآنلاین",
    category: "فناوری",
    subcategory: "طبیعت",
  },
  {
    url: `${FEED_BASE_URLS.KHABARONLINE}/tp/76`,
    source: "خبرآنلاین",
    category: "فناوری",
    subcategory: "دانش‌های بنیادی",
  },
];
