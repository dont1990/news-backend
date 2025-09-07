// src/controllers/ratesController.ts
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { scrapeRates } from "../services/scrapeRates";

const ratesFile = path.join(__dirname, "../data/rates.json");
let cachedRates: Rates | null = null;

// Initialize by reading the file if exists
if (fs.existsSync(ratesFile)) {
  cachedRates = JSON.parse(fs.readFileSync(ratesFile, "utf-8"));
}

// Cron job to update rates every minute
import cron from "node-cron";
import { Rates } from "../types/types";

cron.schedule("*/1 * * * *", async () => {
  const rates = await scrapeRates();
  if (rates) {
    cachedRates = rates;
    fs.writeFileSync(ratesFile, JSON.stringify(rates, null, 2));
  }
});

// API handler
export function getRates(req: Request, res: Response) {
  if (!cachedRates) return res.status(500).json({ message: "Rates not available" });
  res.json(cachedRates);
}
