export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  publishedAt: string;
  readTime?: string;
  imageUrl?: string;
  source: string;
  sourceLink?: string;
  tags?: string[];
  views?: number;
}

// src/types.ts
export interface Rate {
  value: string;
  change: string;
}

export interface Rates {
  dollar: Rate;
  tsetmc: Rate;
  gold: Rate;
  coin: Rate;
  updatedAt: Date;
}

export interface FeedNews {
  url: string;
  source: string;
  category: string;
  subcategory?: string;
}

export type Newspaper = {
  id: string;
  name: string;
  headline: string;
  imageUrl: string;
  link: string;
  date: string;
};
