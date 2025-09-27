import { Request, Response } from "express";

/**
 * Get current time for a given timezone
 */
export const getWorldClock = (req: Request, res: Response) => {
  const { timezone } = req.query;

  if (!timezone || typeof timezone !== "string") {
    return res.status(400).json({ error: "Timezone is required" });
  }

  try {
    const now = new Date();
    res.json({ datetime: now.toISOString() });
  } catch (err) {
    console.error("World clock API error:", err);
    res.status(500).json({ error: "Failed to get time" });
  }
};
