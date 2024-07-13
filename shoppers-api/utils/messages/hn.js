// hn.js
// Severity shall be   error, warn, info, http, verbose, debug, silly
const appMessages = {
  COMMON_ERROR: {
    code: "COMMON_ERROR",
    message: "An error occurred",
    severity: "error",
    responseCode: 404,
  },
  PHONE_NUMBER_ALREADY_REGISTERED: {
    code: "PHONE_NUMBER_ALREADY_REGISTERED",
    message: "Phone number is already registered",
    severity: "error",
    responseCode: 404,
  },
  USER_NOT_FOUND: {
    code: "USER_NOT_FOUND",
    message: "User not found",
    severity: "error",
    responseCode: 404,
  },
};

module.exports = { appMessages };
