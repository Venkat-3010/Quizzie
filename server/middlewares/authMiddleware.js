const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;

const authMiddleware = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Invalid token, Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user._id;
  } catch (error) {
    console.log("Token verification error:", error);
    res
      .status(400)
      .json({ message: "Token is not valid", isTokenInvalid: true });
  }
};

module.exports = authMiddleware;
