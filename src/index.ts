import express from "express";
import "dotenv/config";
import { authMiddleware } from "./authentication/index.ts";
import currentWeather from "./current/index.ts";
import geocodingRouter from "./geocoding/index.ts";
import reverseGeocoding from "./reverseGeocoding/index.ts";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(authMiddleware);

app.use("/api/v1/weather/current", currentWeather);

app.use("/api/v1/geocoding", geocodingRouter);

app.use("/api/v1/reverse-geocoding", reverseGeocoding);

app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} is running`);
});

export default app;