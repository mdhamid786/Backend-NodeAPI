const messageHandler = require("./messageHandler");
const mongoose = require("mongoose");

exports.handleCatchErrors = (messageCode, err, user_id, req, res) => {
  if (err instanceof mongoose.CastError) {
    if (user_id) {
      return messageHandler.handleMessage(
        "MONGO_DB_ERROR",
        user_id,
        err,
        req,
        res
      );
    } else {
      return messageHandler.handleMessage("MONGO_DB_ERROR", err, req, res);
    }
  }
  if (user_id) {
    return messageHandler.handleMessage(messageCode, user_id,  err, req, res);
  } else {
    return messageHandler.handleMessage(messageCode ,err, req, res);
  }
};
