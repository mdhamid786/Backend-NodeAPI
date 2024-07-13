const jwt = require("jsonwebtoken");
const messageHandler = require("../utils/messageHandler");

const User = require("../model/userModel");

//   {authenticate}  // login user access

exports.authenticate = async (req, res, next) => {
  const { user_id } = req.body;
  const token = req.header("Authorization");
  if (!token) {
    return messageHandler.handleMessage("MISSING_TOKEN", "", user_id, req, res);
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken.userId;
    next();
  } catch (err) {
    return res.status(401).json({
      error:
        "Token is invalid for access, please provide a valid token :x: ...",
    });
  }
};

// { authorizedRoles}  // authorized Role access

exports.authorizedRoles = (...roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user);
      console.log(user)
      if (!roles.includes(user.role)) {
        return res.status(403).json({
          Error: `Role: ${user.role} is not allowed to access this resource`,
        });
      }
      next();
    } catch (error) {
      console.error("Error retrieving user role:", error);
      return res.status(500).json({
        Error: "Internal server error",
      });
    }
  };
};



//  authorizedAdmin  // only access Admin

exports.authorizedAdmin = (...roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user);
      if (!roles.includes(user.role)) {
        return res.status(403).json({
          Error: `Role: ${user.role} is not allowed to access this resource`,
        });
      }
      next();
    } catch (error) {
      console.error("Error retrieving user role:", error);
      return res.status(500).json({
        Error: "Internal server error",
      });
    }
  };
};
