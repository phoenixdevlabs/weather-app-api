import express from "express";
import "dotenv/config";
import { authMiddleware } from "./authentication/index.js";
import currentWeather from "./current/index.js";
import geocodingRouter from "./geocoding/index.js";
import reverseGeocoding from "./reverseGeocoding/index.js";
import hourlyWeather from "./hourly/index.js";

import logger from "./utils/logger.js";
import morganMiddleware from "./utils/morganMIddleware.js";
import healthRouter from "./health/index.js";
import cors from "cors";

const corsOptions = {
    origin: ["http://localhost:8081"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "production";

app.use(cors(corsOptions));

app.use(express.json());

app.use("/health", healthRouter);

app.use(authMiddleware);

app.use(morganMiddleware);

app.use("/api/v1/weather/current", currentWeather);

app.use("/api/v1/weather/hourly", hourlyWeather)

app.use("/api/v1/geocoding", geocodingRouter);

app.use("/api/v1/reverse-geocoding", reverseGeocoding);

app.listen(PORT, () => {

    logger.info(`Server runnning in ${NODE_ENV} mode`);

    if (NODE_ENV === "development") {
        logger.info(`Server started at http://localhost:${PORT}`);
    }
});

export default app;