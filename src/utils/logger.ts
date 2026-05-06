import winston from "winston";

const levels = { error: 0, warn: 1, info: 2, http: 3, debug: 4 };

const isDevelopment = process.env.NODE_ENV === "development";

winston.addColors({
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
});

const format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),

    isDevelopment
        ? winston.format.combine(
              winston.format.colorize({ all: true }),
              winston.format.printf(
                  (info) =>
                      `[${info.timestamp}] ${info.level}: ${info.message}`,
              ),
              winston.format.align(), 
              winston.format.errors({ stack: true }),
          )
        : winston.format.json(),
);

const transports = [
    new winston.transports.Console()
];

const logger = winston.createLogger({
    level: "debug",
    levels,
    format,
    transports,
});

export default logger;
