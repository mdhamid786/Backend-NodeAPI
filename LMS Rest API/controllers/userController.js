const User = require("../models/userModel");

const ErrorHandler = require("../utils/errorhandler");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto")
const jwtToken = require("../utils/jwtToken");
const { generateRefreshToken } = require("../config/refreshtoken");
const jwt = require("jsonwebtoken");
const validateMongoDbId = require("../utils/validateMongodbId");
const { sendEmail } = require("../utils/sendEmail");

// const createUser = asyncHandler(async (req, res) => {
//   const email = req.body.email;
//   const findUser = await User.findOne({ email: email });

//   if (!findUser) {
//     const newUser = await User.create(req.body);
//     res.json(newUser);
//   } else {
//     throw new Error("User Already Exists");
//   }
// });

// 1 @DES REGISTER API  - > tested 
// const createUser = asyncHandler(async (req, res) => {
exports.registerUser = asyncHandler(async (req, res) => {
  
  try {
    const { firstname, lastname, email, mobile, password } = req.body;
    // Check if all required fields are provided
    const requiredFields = [
      "firstname",
      "lastname",
      "email",
      "mobile",
      "password",
    ];
    const missingFeilds = requiredFields.filter(feild => !(feild in req.body));
    if (missingFeilds.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Please provide ${missingFeilds.join(", ")}`,
      });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      res.status(404).json({
        success:false,
        message:"Email Already Exist"
      })
     
      }

    // Create a new user
    const user = await User.create({
      firstname,
      lastname,
      email,
      mobile,
      password,
    });

    await user.save();
    const token = jwtToken.generateJWT(user._id);
    // Respond with success message and user data
    res.status(200).json({
      success: true,
      message: "User register successfully...",
      user,
      token,
    });
  } catch (error) {
    throw new Error("Internal server error")
    
  }
});

// 2 DES LOGIN API  tested
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  //  check user exist or not
  const user = await User.findOne({ email });
  if (user && (await user.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(user?._id);
    const updateUser = await User.findByIdAndUpdate(
      user.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      _id: user?.id,
      firstname: user?.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      mobile: user.mobile,
      token: jwtToken.generateJWT(user._id),
    });
  } else {
    res.status(500).json({
      success:false,
      message:"Invalid Credentials"
    })
  }
};

// 3 ADMIN LOGIN API  -> tested
exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const findAdmin = await User.findOne({ email });
    if (findAdmin.role !== "admin") {
      return res.status(400).json({ error: "Not Authorized.." });
    }
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
      const refreshToken = await generateRefreshToken(findAdmin?._id);
      const updateuser = await User.findByIdAndDelete(
        findAdmin.id,
        {
          refreshToken: refreshToken,
        },
        {
          new: true,
        }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });

      res.status(200).json({
        
        _id: findAdmin?.id,
        firstname: findAdmin?.firstname,
        lastname: findAdmin?.lastname,
        email: findAdmin?.email,
        mobile: findAdmin?.mobile,
        token: jwtToken.generateJWT(findAdmin?._id),
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// 4  HANDLE REFRESH TOKEN API  tested
exports.handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  console.log(user)
  if (!user)
   throw new Error(" No Refresh token present in db or not matched");

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      console.log(user.id,"not")
     
    }
    const accessToken = jwtToken.generateJWT(user._id)
    res.json({ accessToken });
  });
});

// 5 @DES GET ALL USERS API  -> tested
exports.getAllUser = async (req, res, next) => {
  try {
    const user = await User.find();
    if (!user || user.length === 0) {
      return next(new ErrorHandler("User not found", 401));
    }
    res.status(200).json({
      status: true,
      users: user,
    });
  } catch (error) {
    return next(new ErrorHandler("Server error", 500));
  }
};

// 6 DES GET USER DETAILS API  -> tested
exports.getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      status: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// 7 DES DELETE USER API   -> tested
exports.deleteUser = asyncHandler(async (req, res) => {
  const {id} = req.params;
  validateMongoDbId(id)
  try {
   
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return next(new ErrorHandler("User not found for the specified id", 404));
    }
    res.status(200).json({
      success: true,
      deletedUser:user,
      message: "User deleted successfully!!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// 8 DES UPDATE USER API  -> tested
exports.updateUser =  asyncHandler(async (req, res) => {
  const { _id } = req.user;
  // validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});
// """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""1.11.11
// 7 DES BLOCK USER API   -> tested
exports.blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const blockusr = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      success:true,
      message:"User Blocked"
    });
  } catch (error) {
    throw new Error(error);
  }
});

//8 DES UNBLOCK USER API   -> tested
exports.unBlockUser =asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const blockusr = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      success:true,
      message:"User UnBlocked"
    });
  } catch (error) {
    throw new Error(error);
  }
});

// 9 FORGOT PASSWORD API
exports.forgotPassword =  asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:4000/api/user/reset-password/${token}'>Click Here</>`;
    const data = {
      to: user.email,
      text: "Hey User",
      subject: "Forgot Password Link",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

// reset password 
exports.resetPassword =  asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error(" Token Expired, Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

// 10 UPDATE PASSWORD API
exports.updatePassword = async (req, res, next) => {
  const { _id } = req.user;
  const {password} = req.body;
  validateMongoDbId(_id);
  try {
    const user = await User.findById(_id);
    console.log(user)
    if (password) {
      user.password = password;
      const updatedPassword = await user.save();
    

      res.status(200).json({
        success: true,
        updatedPassword,
      });
    } else {
      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


// 13 LOGOUT API    -> tested
exports.userLogout = async (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    res.status(400).json({
      success: false,
      message: "No refresh token in cookies",
    });
  }

  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });

  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndDelete(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
};

// 14 SAVE ADDRESS API
exports.saveAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    throw new Error(error)
  }
});
