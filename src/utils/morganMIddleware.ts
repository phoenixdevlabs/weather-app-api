import morgan from "morgan";
import type { StreamOptions } from "morgan";
import logger from "./logger.js";

const stream: StreamOptions = {
    write: (message) => logger.info(message.trim()),
};
const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
};
export const morganMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    { stream, skip },
);

export default morganMiddleware;