// server/controllers/worldClock.ts
import { Request, Response } from "express";
import { capitals } from "../constants/capitals";

export const getWorldClock = (req: Request, res: Response) => {
  try {
    const now = new Date();

    // Map each city to its current time in its timezone
    const data = capitals.map((cap) => {
      const local = new Date( 
        now.toLocaleString("en-US", { timeZone: cap.timezone })
      );
      const hour = local.getHours();
      const time = local.toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: cap.timezone,
      });
      const timezoneAbbr = new Intl.DateTimeFormat("en", {
        timeZone: cap.timezone,
        timeZoneName: "short",
      })
        .formatToParts(local)
        .find((p) => p.type === "timeZoneName")?.value;

      return {
        city: cap.cityFa,
        timezone: cap.timezone,
        time,
        hour,
        timezoneAbbr,
      };
    });

    res.json(data);
  } catch (err) {
    console.error("World clock API error:", err);
    res.status(500).json({ error: "Failed to get time" });
  }
};
