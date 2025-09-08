// src/controllers/newsletter.controller.ts
import { Request, Response } from "express";
import { readJson, writeJson } from "../utils/fileDb";

const newsletterFile = "newsletter.json";

interface Subscriber {
  email: string;
  subscribedAt: string;
}

export const subscribeNewsletter = (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const subscribers: Subscriber[] = readJson<Subscriber[]>(newsletterFile) || [];

  if (subscribers.find((s) => s.email === email)) {
    return res.status(400).json({ message: "Email already subscribed" });
  }

  subscribers.push({ email, subscribedAt: new Date().toISOString() });
  writeJson(newsletterFile, subscribers);

  res.json({ message: "Subscribed successfully" });
};
