const { appMessages } = require("../utils/messages/en");
const availableLanguages = ["en", "hn"]; // Add more languages as needed

module.exports = (req, res, next) => {
  // Determine user's preferred language (e.g., from request headers, user settings, etc.)
  const userLanguage = req.headers["accept-language"] || "en"; // Default to English

  // Load the corresponding message file based on the user's preferred language
  let languageMessages = {};
  if (availableLanguages.includes(userLanguage)) {
    languageMessages = require(`../utils/${userLanguage}.js`).appMessages;
  } else {
    languageMessages = appMessages; // Default to English messages
  }

  // Attach the language-specific messages to the request object
  req.languageMessages = languageMessages;

  next();
};
