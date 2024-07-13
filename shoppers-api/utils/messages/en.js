// en.js
// Severity shall be   error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
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

  SHOPKEEPER_NOT_FOUND: {
    code: "SHOPKEEPER_NOT_FOUND",
    message: "Shopkeeper not found",
    severity: "error",
    responseCode: 404,
  },

 
  TENANT_NOT_FOUND: {
    code: "TENANT_NOT_FOUND",
    message: "Tenant not found",
    severity: "error",
    responseCode: 404,
  },

  NOTIFICATION_NOT_FOUND: {
    code: "NOTIFICATION_NOT_FOUND",
    message: "Notification not found",
    severity: "error",
    responseCode: 404,
  },

  USER_UPDATED: {
    code: "USER_UPDATED",
    message: "User updated successfully",
    severity: "info",
    responseCode: 200,
  },

  USER_ADDED: {
    code: "USER_ADDED",
    message: "User added successfully",
    severity: "info",
    responseCode: 200,
  },

  USER_DELETED: {
    code: "USER_DELETED",
    message: "User delete successfully",
    severity: "info",
    responseCode: 200,
  },
  ADDRESS_ADDED: {
    code: "ADDRESS_ADDED",
    message: "Address added successfully",
    severity: "info",
    responseCode: 200,
  },
  INTERNAL_ERROR: {
    code: "INTERNAL_ERROR",
    message: "Application Exception: Internal Server Error",
    severity: "error",
    responseCode: 500,
  },
  MONGO_DB_ERROR: {
    code: "MONGO_DB_ERROR",
    message: "Database Exception: Database returned an error",
    severity: "error",
    responseCode: 500,
  },
  MISSING_TOKEN: {
    code: "MISSING_TOKEN",
    message: "Token is Missing, Access Denied",
    severity: "error",
    responseCode: 401,
  },
  INVALID_TOKEN: {
    code: "INVALID_TOKEN",
    message: "Token is Invalid, Access Denied",
    severity: "error",
    responseCode: 401,
  },
  UNAUTHORIZED_ACCESS: {
    code: "UNAUTHORIZED_ACCESS",
    message: "User is not Authorized",
    severity: "error",
    responseCode: 401,
  },
  AUTHORIZEDROLES_ERROR: {
    code: "AUTHORIZEDROLES_ERROR",
    message: "authorizedRoles middleware returned an error",
    severity: "error",
    responseCode: 401,
  },
  ADDRESS_NOT_FOUND: {
    code: "ADDRESS_NOT_FOUND",
    message: "Requested Address not found for the User",
    severity: "error",
    responseCode: 404,
  },
  ADDRESS_UPDATED: {
    code: "ADDRESS_UPDATED",
    message: "Address updated successfully",
    severity: "info",
    responseCode: 200,
  },

  BILL_UPDATED: {
    code: "BILL_UPDATED",
    message: "Bill updated successfully",
    severity: "info",
    responseCode: 200,
  },

  BILL_ADDED: {
    code: "BILL_ADDED",
    message: "Bill added successfully",
    severity: "info",
    responseCode: 200,
  },
  BILL_NOT_FOUND: {
    code: "BILL_NOT_FOUND",
    message: "Requested bill not found for the user ",
    severity: "error",
    responseCode: 404,
  },

  BILL_DELETED: {
    code: "BILL_NOT_FOUND",
    message: "Bill delete successfully",
    severity: "info",
    responseCode: 200,
  },

  SHOP_ADDED: {
    code: "SHOP_ADDED",
    message: "Shop added successfully",
    severity: "info",
    responseCode: 200,
  },

  SHOP_NOT_FOUND: {
    code: "SHOP_NOT_FOUND",
    message: "Requested Shop not found for the User",
    severity: "error",
    responseCode: 404,
  },

  SHOP_UPDATED: {
    code: "SHOP_UPDATED",
    message: "Shop updated successfully",
    severity: "info",
    responseCode: 200,
  },

  SHOP_DELETED: {
    code: "SHOP_DELETED",
    message: "Shop delete successfully",
    severity: "info",
    responseCode: 200,
  },

  BLOCKED_USER: {
    code: "BLOCKED_USER",
    message: "User Blocked successfully",
    severity: "info",
    responseCode: 200,
  },

  UNBLOCKED_USER: {
    code: "UNBLOCKED_USER",
    message: "User unBlocked successfully",
    severity: "info",
    responseCode: 200,
  },
  NOTIFICATION_ADDED: {
    code: "NOTIFICATION_ADDED",
    message: "Notification added successfully",
    severity: "info",
    responseCode: 200,
  },

  NOTIFICATION_MARK_READ: {
    code: "NOTIFICATION_MARK_READ",
    message: "Notification marked read",
    severity: "info",
    responseCode: 200,
  },

  ENTER_MOBILE_NUM_PASSWORD: {
    code: "ENTER_MOBILE_NUM_PASSWORD",
    message: "Enter correct mobile number and password",
    severity: "error",
    responseCode: 404,
  },

  INVALID_PHONE_PASSWORD: {
    code: "INVALID_PHONE_PASSWORD",
    message: "Invalid mobile number and password",
    severity: "error",
    responseCode: 404,
  },

  INVALID_PASSWORD: {
    code: "INVALID_PASSWORD",
    message: "Enter correct password",
    severity: "error",
    responseCode: 404,
  },
};

module.exports = { appMessages };
