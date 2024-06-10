const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const authMiddleware = async(req, res, next) => {
  const token = req.header('Authorization')
  // ?.split(" ")[1];
  // console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Invalid token, Authorization denied", token: token});
  }

  try {
    const {id} = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(id);
    req.user = user;
    next();
  } catch (error) {
    console.log("Token verification error:", error);
    res
      .status(400)
      .json({ message: "Token is not valid", isTokenInvalid: true });
  }
};

module.exports = authMiddleware;
