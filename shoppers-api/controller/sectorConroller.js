const Address = require("../model/addressModel");
const User = require("../model/userModel");
const messageHandler = require("../utils/messageHandler");
const catchHandler = require("../utils/catchHandler");
const Notification = require("../model/notificationModel");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const notificationHandler = require("../utils/notificationHandler");
const sectorModel = require("../model/sectorModel");

// Add Sector Address API
// @ POST API  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.addSectorAddress = catchAsyncErrors(async (req, res, next) => {
  const { user_id, city, sector, h_number } = req.body;
  try {
    const user = await User.findById(user_id);
    if (!user) {
      return messageHandler.handleMessage(
        "USER_NOT_FOUND",
        "",
        user_id,
        req,
        res
      );
    }
    const newAddress = new sectorModel({
      user_id,
      city,
      sector,
      h_number,
    });
    await newAddress.save();
    const newNotification = new Notification({
      type: "ADDRESS_ADDED",
      typeId: newAddress._id,
      user_id,
    });
    await newNotification.save();
    return notificationHandler.handleNotification(
      "ADDRESS_ADDED",
      user_id,
      "",
      req,
      res
    );
  } catch (err) {
    return catchHandler.handleCatchErrors("INTERNAL_ERROR", "", err, req, res);
  }
});

// @ GET API  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.getAdderssUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const address = await sectorModel.find({
      user_id,
    }); 

    if (!address || address.length === 0) {
      return messageHandler.handleMessage(
        "ADDRESS_NOT_FOUND",
        "",
        user_id,
        req,
        res
      );
    }
    return res.status(200).json({ address });
  } catch (err) {
    return catchHandler.handleCatchErrors("INTERNAL_ERROR", "", err, req, res);
  }
});






//  update address of sector user 
//  @description put api

exports.updateSectorAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    const {  city, sector , h_number } = req.body;
    const user_id = req.params.user_id; 

    const updatedAddress = await sectorModel.findOneAndUpdate(
      { user_id }, 
      {
        city, sector , h_number
      },
      {
        new: true,
      }
    );

    if (!updatedAddress) {
      return messageHandler.handleMessage(
        "",
        "ADDRESS_NOT_FOUND",
        user_id,
        req,
        res
      );
    }

    const existingUser = await User.findById(user_id);

    if (!existingUser) {
      return messageHandler.handleMessage(
        "",
        "USER_NOT_FOUND",
        user_id,
        req,
        res
      );
    }

    const newNotification = new Notification({
      type: "ADDRESS_UPDATED",
      typeId: updatedAddress._id,
      user_id: updatedAddress.user_id,
    });
    await newNotification.save();
    
    return notificationHandler.handleNotification(
      "ADDRESS_UPDATED",
      user_id,
      "",
      req,
      res
    );
  } catch (err) {
    return catchHandler.handleCatchErrors("INTERNAL_ERROR", "", err, req, res);
  }
});
