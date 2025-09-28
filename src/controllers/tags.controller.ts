import { Request, Response } from "express";
import { TagStat } from "../types/types";
import { readJson, writeJson } from "../utils/fileDb";

const tagsFile = "tagStats.json";
let cachedTagStats: TagStat[] = [];

export function getTagStats(): TagStat[] {
  if (cachedTagStats.length > 0) return cachedTagStats;

  try {
    cachedTagStats = readJson<TagStat[]>(tagsFile);
    return cachedTagStats;
  } catch {
    return [];
  }
}

export function incrementTagClick(tag: string): TagStat {
  let stats = getTagStats();
  let entry = stats.find((t) => t.tag === tag);

  if (!entry) {
    entry = { tag, clicks: 0 };
    stats.push(entry);
  }

  entry.clicks++;
  cachedTagStats = stats;
  writeJson(tagsFile, stats);

  return entry;
}


export const getTagsStats = (req: Request, res: Response) => {
  res.json({ data: getTagStats() });
};

export const incrementTagClickController = (req: Request, res: Response) => {
  const { tag } = req.params;
  if (!tag) return res.status(400).json({ message: "Tag is required" });

  const updated = incrementTagClick(tag);
  res.json(updated);
};

export const getTrendingTags = (req: Request, res: Response) => {
  const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : 5;

  const allTags: TagStat[] = getTagStats();

  const trending: TagStat[] = allTags
    .sort((a, b) => b.clicks - a.clicks) // sort descending
    .slice(0, limit); // take top N

  res.json({ data: trending });
};