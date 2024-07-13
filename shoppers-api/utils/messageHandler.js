const logger = require("./logger"); // Import the logger instance
const languageMessages = require("../utils/messages/en");

exports.handleMessage = (messageCode, user_id, err, req, res) => {
  const appMessage = languageMessages.appMessages[messageCode].message;
  const appMessageCode = languageMessages.appMessages[messageCode].severity;
  const appResponseCode =
    languageMessages.appMessages[messageCode].responseCode;
  console.log(appResponseCode);
  console.log("req:", appMessageCode, appResponseCode, appMessage);

  const loggerMethod = getLoggerMethod(appMessageCode); // Get the appropriate logger method
  if (user_id) {
    loggerMethod(`${appMessage} for user ID: ${user_id}`);
  } else {
    loggerMethod(`${appMessage}`); // Log without user ID
  }
  if (!err) {
    return res.status(appResponseCode).json({ message: appMessage });
  } else {
    return res.status(appResponseCode).json({
      message: appMessage,
    });
  }
};

// This fucntion returns the level of the logger
// Severity shall be   error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6

function getLoggerMethod(severity) {
  switch (severity) {
    case "error":
      return logger.error;
    case "warn":
      return logger.warn;
    case "info":
      return logger.info;
    case "http":
      return logger.http;
    case "verbose":
      return logger.verbose;
    case "debug":
      return logger.debug;
    case "silly":
      return logger.silly;
    default:
      return logger.info; // Default to info if severity is not recognized
  }
}
