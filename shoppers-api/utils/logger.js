const winston = require("winston");
const { format } = winston;
const fs = require("fs");
const path = require("path");

// Create log directory if it doesn't exist
const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Define log formats
const logFormat = format.combine(format.timestamp(), format.json());

// Create a logger instance
const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [ 
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logDir, `${process.env.APP_NAME || "app"}_error.log`),
      level: "error",
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(
        logDir,
        `${process.env.APP_NAME || "app"}_exceptions.log`
      ),
    }),
  ],
});

// Log unhandled exceptions
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1); // Exit with failure code
});

module.exports = logger;
