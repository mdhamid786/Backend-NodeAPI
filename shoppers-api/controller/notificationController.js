const Notification = require("../model/notificationModel");
const messageHandler = require("../utils/messageHandler");
const catchHandler = require("../utils/catchHandler");
const User = require("../model/userModel");

const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");

//Fetch unread Notification from database
//@GET API  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.userNotification = catchAsyncErrors(async (req, res, next) => {
  const { user_id } = req.params; 
  try {
    const userNotifications = await Notification.find({user_id,unread: true,   
    });
    if (!userNotifications || userNotifications.length === 0) {
      return messageHandler.handleMessage(
        "NOTIFICATION_NOT_FOUND",
        "",
        user_id,
        req,
        res
      ); 
    }

    res.status(200).json({
      success: true,
      userNotifications,
    });
  } catch (err) {
    return catchHandler.handleCatchErrors("INTERNAL_ERROR", "", err, req, res);
  }
});

// Fetch read Notification from database
//@PUT API :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.readNotification = catchAsyncErrors(async (req, res, next) => {
  const user_id = req.params.user_id;
  console.log(user_id);
  try {
    const now = new Date();
    const updatedNotification = await Notification.updateMany(
      { user_id, unread: true },
      { $set: { unread: false, readAt: now.toISOString() } } 
    );

    console.log(updatedNotification);


    await messageHandler.handleMessage("NOTIFICATION_MARK_READ", "", user_id, req, res);
  } catch (err) {
    await catchHandler.handleCatchErrors("INTERNAL_ERROR", "", user_id, err, req, res);
  }
});


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
