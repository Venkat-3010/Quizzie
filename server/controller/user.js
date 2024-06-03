const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const formattedEmail = email.toLowerCase();
  try {
    if (!name || !email || !password ) {
      return res.status(400).json({
        message: "please fill all the fields",
      });
    }

    let existingUser = await User.findOne({ email: formattedEmail });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = new User({
      name,
      email: formattedEmail,
      password: hashedPassword
    });
    await userData.save();
    res.json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "please fill all the fields",
      });
    }

    let userDetails = await User.findOne({ email: email.toLowerCase() });
    if (!userDetails) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      userDetails.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Password is incorrect",
      });
    }

    const token = jwt.sign(
      { user: { id: userDetails.id } },
      process.env.SECRET_KEY,
      { expiresIn: "60h" }
    );
    res.json({
      message: "User logged in successfully",
      token,
      id: userDetails.id,
      name: userDetails.name,
      email: userDetails.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  userRegister,
  userLogin,
};
