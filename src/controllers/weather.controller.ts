import { Request, Response } from "express";
import { iranCities } from "../constants/iranCities";
import axios from "axios";

const API_KEY = process.env.OPENWEATHER_API_KEY;

export const getWeather = async (req: Request, res: Response) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
          lang: "fa", // Persian descriptions
        },
      }
    );

    const data = response.data;

    res.json({
      id: data.id,
      city:
        iranCities.find(
          (c) => c.en.toLowerCase() === String(city).toLowerCase()
        )?.fa || data.name,
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      wind: data.wind.speed,
    });
  } catch (error: any) {
    console.error("Weather API error:", error.message);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
};
