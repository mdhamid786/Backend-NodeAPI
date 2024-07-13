const User = require("../model/userModel");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const jwtUtils = require("../utils/jwtUtils");
const messageHandler = require("../utils/messageHandler");
const catchHandler = require("../utils/catchHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");

//  login user == used
// @ POST API  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { phone_number } = req.body;
  const user = await User.findOne({
    phone_number,
  });
  if (!user) {
    const user = new User({ 
      phone_number,
    });
    await user.save();
    const token = jwtUtils.generateJWT(user._id);
    res.status(200).json({
      success: true,
      isRegistered: false,
      token,
      user,
      alreadyExist:false
      
    });
  } else {
    const token = jwtUtils.generateJWT(user._id);
    res.status(200).json({
      success: true,
      user,
      userRegistered: true,
      token,
      alreadyExist:true
    });
  }
});

//  Register user == used
// @ POST API  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { phone_number, nameOfUser, role } = req.body;
  var user_id;
  try {
    const user = await User.findOne({
      phone_number,
    });
   
    if (!user) {
      return messageHandler.handleMessage(
        "USER_NOT_FOUND",
        "",
        user_id,
        req,
        res
      );
    } else {
      user.nameOfUser = nameOfUser;
      user.role = role;
      user.isRegistered = true;
      await user.save();
      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    res.status(401).json({ error: "server error" });
  }
});

// User Profile API  == used
//@GET API  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.profileData = catchAsyncErrors(async (req, res, next) => {
  const user_id = req.params.id;
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
    return res.status(200).json({ user });
  } catch (err) {
    return catchHandler.handleCatchErrors("INTERNAL_ERROR", "", err, req, res);
  }
});

// Total Profile Data fetch from databse == used
//@GET API  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.allProfileData = async (req, res, next) => {
  const user = await User.find();
  try {
    if (!user || user.length === 0) {
      return messageHandler.handleMessage(
        "USER_NOT_FOUND",
        "",
        user_id,
        req,
        res
      );
    }

    return res.status(200).json({ user });
  } catch (err) {
    return catchHandler.handleCatchErrors("INTERNAL_ERROR", err, req, res);
  }
};

// shopkeeper profile Data fetch from databse == used
//@GET API  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.allShopkeeperProfiles = async (req, res, next) => {
  try {
    const shopkeepers = await User.find({ role: "shopkeeper" });
    if (!shopkeepers || shopkeepers.length === 0) {
      return messageHandler.handleMessage("SHOPKEEPER_NOT_FOUND", "", req, res);
    }
    return res.status(200).json({ shopkeepers });
  } catch (err) {
    return catchHandler.handleCatchErrors("INTERNAL_ERROR", err, req, res);
  }
};

// user profile Data fetch from databse == used
//@GET API  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.allTenantProfiles = async (req, res, next) => {
  var user_id
  try {
    const tenant = await User.find({ role: "user" });
    if (!tenant || tenant.length === 0) {
      return messageHandler.handleMessage("TENANT_NOT_FOUND", "", user_id,req, res);
    }
    return res.status(200).json({ tenant });
  } catch (err) {
    return catchHandler.handleCatchErrors("INTERNAL_ERROR", err,user_id, req, res);
  }
};

// User Update API   == used
//@UPDATE API  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.profileUpdate = catchAsyncErrors(async (req, res, next) => {
  var user_id
  const { role, nameOfUser , phone_number} = req.body;
 
  try {
    const id = req.body.user_id;
    const updateRole = await User.findByIdAndUpdate(
      id,
      {
        role,
        nameOfUser,
        phone_number
       
      },
      {
        new: true,
      }
    );
    if (!updateRole || updateRole.length === 0) {
      return messageHandler.handleMessage("USER_NOT_FOUND", user_id, req, res);
    }

    return messageHandler.handleMessage("USER_UPDATED", user_id, "", req, res);
  } catch (err) {
    return catchHandler.handleCatchErrors("INTERNAL_ERROR", "", err, req, res);
  }
});

// delete user profile
// @  DELETE API
exports.deleteProfile = catchAsyncErrors(async (req, res, next) => {
  const { user_id } = req.body;
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.user_id);
    if (!deletedUser || deletedUser.length === 0) {
      return messageHandler.handleMessage(
        "USER_NOT_FOUND",
        "",
        user_id,
        req,
        res
      );
    }
    return messageHandler.handleMessage("USER_DELETED", user_id, "", req, res);
  } catch (err) {
    return catchHandler.handleCatchErrors("INTERNAL_ERROR", "", err, req, res);
  }
});

// add a User
exports.addUser = catchAsyncErrors(async (req, res, next) => {
  try {
    var user_id
    const { nameOfUser, phone_number, role } = req.body;
    if (!nameOfUser || !phone_number || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findOne({
      phone_number,
    });
 
   
   
    const newUser = await User.create({ nameOfUser, phone_number, role });
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
