const catchAsyncError = require("../middleware/catchAsyncError");
const Join = require("../models/joinModel");
const ErrorHandler = require("../utils/errorhandler");
const QRCode = require("qrcode");

// Join Event
//@POST API

exports.joinUser = catchAsyncError(async (req, res, next) => {
  const { user_id, event_id } = req.body;

  try {
    const alreadyJoined = await Join.findOne({ user_id, event_id });

    if (alreadyJoined) {
      return next(new ErrorHandler("User already joined this event", 400));
    }

    const join = new Join({
      user_id,
      event_id,
    });
    await join.save();
    res.status(200).json({ success: true, join });
  } catch (error) {
    console.error("Error:", error);
  }
});


