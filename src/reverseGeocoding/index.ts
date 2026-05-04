import express from "express";
import type { Request, Response } from "express";

import { reverseGeocoding } from "../openmeteo/index.ts";

const reverseGeocodingRouter = express.Router();

reverseGeocodingRouter.get("/", async (req: Request, res: Response) => {
    const { lat, lon} = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: "Latitude and longitude parameters are required" });
    }

    try {
        const reverseGeocodingData = await reverseGeocoding({
            lat: Number(lat),
            lon: Number(lon),
        });
        
        res.json(reverseGeocodingData);
    } catch (error) {
        console.error("Error fetching reverse geocoding data:", error);
        res.status(500).json({ error: "Failed to fetch reverse geocoding data" });
    }

});

export default reverseGeocodingRouter;