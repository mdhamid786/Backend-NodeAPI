const jwt = require("jsonwebtoken");

// Generate JWT token
exports.generateJWT = (userId) => {
  const token = jwt.sign(
    {
      userId: userId,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "2d",
    }
  );
  return token;
};