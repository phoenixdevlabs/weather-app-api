import express from "express";
import type { Request, Response } from "express";

import { getGeocodingData } from "../openmeteo/index.ts";

const geocodingRouter = express.Router();

geocodingRouter.get("/", async (req: Request, res: Response) => {
    const { name, count, language } = req.query;

    if (!name) {
        return res.status(400).json({ error: "Name parameter is required and must be a string" });
    }

    if (!count) {
        return res.status(400).json({ error: "Count parameter is required and must be a number" });
    }

    if (!language) {
        return res.status(400).json({ error: "Language parameter is required and must be a string" });
    }

    try {
        const geocodingData = await getGeocodingData({
            name: name as string,
            count: Number(count),
            language: language as string,
        });

        res.json(geocodingData);
    } catch (error) {
        console.error("Error fetching geocoding data:", error);
        res.status(500).json({ error: "Failed to fetch geocoding data" });
    }
});

export default geocodingRouter;