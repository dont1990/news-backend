import { Request, Response } from "express";
import { scrapeJaaar } from "../services/scrapeNewspapers";

export async function getNewspapers(req: Request, res: Response) {
  try {
    const limit = Number(req.query.limit) || undefined;
    const data = await scrapeJaaar();

    // Apply limit if passed
    const limitedData = limit ? data.slice(0, limit) : data;

    res.json(limitedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch newspapers" });
  }
}
