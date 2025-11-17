import { Request, Response } from "express";
import cron from "node-cron";
import { scrapeRates } from "../services/scrapeRates";
import { Rates } from "../types/types";
import { readJson, writeJson } from "../utils/fileDb"; 

const ratesFile = "rates.json"; // just file name
let cachedRates: Rates | null = null;

// ✅ Initialize from file safely
try {
  cachedRates = readJson<Rates>(ratesFile);
} catch (err) {
  console.warn("⚠️ Rates file not found or invalid, starting with null cache");
  cachedRates = null;
}

// ✅ Cron job → update rates every 1 minute
cron.schedule("*/1 * * * *", async () => {
  const rates = await scrapeRates();
  console.log(rates)
  if (rates) {
    cachedRates = rates;
    writeJson(ratesFile, rates); // ✅ use helper
  }
});

// ✅ API handler
export function getRates(req: Request, res: Response) {
  if (!cachedRates) {
    return res.status(500).json({ message: "Rates not available" });
  }
  res.json(cachedRates);
}
