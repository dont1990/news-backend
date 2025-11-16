import { Request, Response } from "express";
import axios from "axios";

const API_KEY = process.env.OPENWEATHER_API_KEY;

export const getWeather = async (req: Request, res: Response) => {
  const { cities } = req.query; // expect comma-separated cities
  if (!cities) return res.status(400).json({ error: "Cities are required" });

  const cityList = (cities as string).split(",");

  try {
    const results = await Promise.all(
      cityList.map(async (city) => {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          { params: { q: city, appid: API_KEY, units: "metric", lang: "fa" } }
        );

        const data = response.data;
        return {
          id: data.id,
          city: data.name,
          temp: Math.round(data.main.temp),
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          humidity: data.main.humidity,
          wind: data.wind.speed,
        };
      })
    );

    res.json(results);
  } catch (error: any) {
    console.error("Weather API error:", error.message);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
};
