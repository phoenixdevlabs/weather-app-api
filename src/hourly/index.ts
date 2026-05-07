import express from "express";
import type { Request, Response } from "express";
import { getHourlyWeather } from "../openmeteo/index.js";

const hourlyWeather = express.Router();

hourlyWeather.get("/", async (req: Request, res: Response) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: "Latitude and longitude parameters are required" });
    }

    try {
        const hourlyWeatherData = await getHourlyWeather({
            lat: Number(lat),
            lon: Number(lon),
        });
        
        res.json(hourlyWeatherData);
    } catch (error) {
        console.error("Error fetching hourly weather data:", error);
        res.status(500).json({ error: "Failed to fetch hourly weather data" });
    }

});

export default hourlyWeather;

