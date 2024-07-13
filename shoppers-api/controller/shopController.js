const Shop = require("../model/shopModel");
const User = require("../model/userModel");
const messageHandler = require("../utils/messageHandler");
const catchHandler = require("../utils/catchHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const Notification = require("../model/notificationModel");


// Add new Shop  == used
//@POST API   :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.addShop = catchAsyncError(async (req, res, next) => {
  const { name, location, owner , city, society, user_id} = req.body;
  try {
    const newShop = new Shop({
      city,
      user_id,
      society,
      name,
      location,
      owner,
    });  
    await newShop.save();
    const newNotification = new Notification({
      type: "SHOP_ADDED",
      typeId: newShop._id,
      user_id
    });
    await newNotification.save(); 
    // return messageHandler.handleMessage("SHOP_ADDED","", user_id, req, res);
    res.status(200).json({
      messgae:"shop added successfully",
      shopid:newShop._id

    })
  } catch (err) {
    return catchHandler.handleCatchErrors(
      "INTERNAL_ERROR","",
      err,
      user_id, 
      req,
      res
    );
  }
});


// Gel All Shop from databse == used
//@GET API   :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
exports.getAllShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const shop = await Shop.find();
    if (!shop || shop.length === 0) {
      return messageHandler.handleMessage("SHOP_NOT_FOUND", user_id,"", req, res);
    }
    res.status(200).json({
      success: true,
      shop,
    });
  } catch (err) {
    return catchHandler.handleCatchErrors("INTERNAL_ERROR", err, req, res);
  }
});


// Get a Specific user_id ID  == used
//@GET API   :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.getSingleShop = catchAsyncErrors(async (req, res, next) => {
  const user_id = req.params.user_id;
  try {
    const shop = await Shop.find({user_id});
    if (!shop || shop.length === 0) {
      return messageHandler.handleMessage(
        "SHOP_NOT_FOUND",
        "",
        user_id,
        req,
        res
      );
    }
    return res.status(200).json({ shop });
  } catch (err) {
    return catchHandler.handleCatchErrors("INTERNAL_ERROR", "", err, req, res);
  }
});


// Get a Specific Shop By ID  == used
//@GET API   :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.getShopByShopId = catchAsyncErrors(async (req, res, next) => {
  var user_id
  const shop_id = req.params.id;
  try {
    const shop = await Shop.findById(shop_id);
    if (!shop || shop.length === 0) {
      return messageHandler.handleMessage(
        "SHOP_NOT_FOUND",
        "",
        user_id,
        req,
        res
      );
    }
    return res.status(200).json({ shop });
  } catch (err) {
    return catchHandler.handleCatchErrors("INTERNAL_ERROR", "", err, req, res);
  }
});

// Update Shop == used
//@PUT API :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.updateShop = catchAsyncErrors(async (req, res, next) => {
  const { user_id } = req.body;
  const { name, location, owner } = req.body;
  
  try {
    const updatedShop = await Shop.findByIdAndUpdate(req.body.shopId, {
      name,
      location,
      owner,
    });
    if (!updatedShop || updatedShop.length === 0) {
      return messageHandler.handleMessage("SHOP_NOT_FOUND", user_id,"", req, res);
    }
    return messageHandler.handleMessage("SHOP_UPDATED", user_id, "", req, res);
  } catch (err) {
    return catchHandler.handleCatchErrors("INTERNAL_ERROR", "", err, req, res);
  }
});

// Delete shop by id
//@Delete API :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.deleteShop = catchAsyncErrors(async (req, res, next) => {
  const { user_id } = req.body;
  try {
    const deletedShop = await Shop.findByIdAndDelete(req.params.shopId);
    if (!deletedShop || deletedShop.length === 0) {
      return messageHandler.handleMessage("SHOP_NOT_FOUND", user_id,"", req, res);
    }
    return messageHandler.handleMessage("SHOP_DELETED", user_id, "", req, res);
  } catch (err) {
    return catchHandler.handleCatchErrors("INTERNAL_ERROR", "", err, req, res);
  }
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
