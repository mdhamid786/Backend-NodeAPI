const jwt = require("jsonwebtoken");

// generate jwt token

exports.generateJWT = (id) => {
  const token = jwt.sign(
    {
      userId: id,
    },
    process.env.SECRET_KEY,

    {
      expiresIn: "2d",
    }
  );
  return token;
};
