import express from "express";
import type { Request, Response } from "express";
import { getCurrentWeather } from "../openmeteo/index.ts";  

const currentWeather = express.Router();

currentWeather.get("/", async (req: Request, res: Response) => {

    console.log("Received request for current weather with query parameters:", req.query);
    
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: "Latitude and longitude parameters are required" });
    }

    try {
         const currentWeatherData = await getCurrentWeather({
            lat: Number(lat),
            lon: Number(lon),
        });
        
        res.json(currentWeatherData);
    } catch (error) {
        console.error("Error fetching current weather data:", error);
        res.status(500).json({ error: "Failed to fetch current weather data" });
    }

});

export default currentWeather;