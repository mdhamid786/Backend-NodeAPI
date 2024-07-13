const Address = require("../model/addressModel");
const User = require("../model/userModel");
const messageHandler = require("../utils/messageHandler");
const catchHandler = require("../utils/catchHandler");
const Notification = require("../model/notificationModel");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const notificationHandler = require("../utils/notificationHandler");

// Address API
// @ POST API  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.addAddress = catchAsyncErrors(async (req, res, next) => {
  const { user_id, city, society, tower_block, flat_number } = req.body;
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
   const newAddress = new Address({
      user_id,
      city,
      society,
      tower_block,
      flat_number,
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

// Get Address API by Address ID
// @ GET API  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.getAdderssById = catchAsyncErrors(async (req, res, next) => {
  const addressId = req.params.addressId;

  try {
    const address = await Address.findById(addressId);
    if (!address || address.length === 0) {
      return messageHandler.handleMessage(
        "ADDRESS_NOT_FOUND",
        "",
        user_id,
        req,
        res
      );
    }

    return res.status(200).json({
      address,
    });
  } catch (err) {
    return catchHandler.handleCatchErrors("INTERNAL_ERROR", "", err, req, res);
  }
});

// Get address by userID
// @ GET API  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.getAdderssByUserId = catchAsyncErrors(async (req, res, next) => {

  try {
    const user_id = req.params.user_id;
    const address = await Address.find({
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

// Update Address
// @PUT API  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.updateAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    const { state, city, society, tower_block, flat_number } = req.body;
    const user_id = req.params.user_id; 

    const updatedAddress = await Address.findOneAndUpdate(
      { user_id }, 
      {
        state,
        city,
        society,
        tower_block,
        flat_number
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

