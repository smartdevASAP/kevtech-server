const bcrypt = require("bcryptjs");
const user = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

//logging in an existing user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await user.findOne({ email });

    //case:INCOMPLETE INFORMATION
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }
    //when providing wrong information;
    if (!foundUser) {
      return res.status(400).json({
        success: false,
        message: "invalid email or password",
      });
    }
    //WHEN THE USER EXISTS IN THE DATABASE;
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "invalid credentials",
      });
    }

    const token = jwt.sign({ id: foundUser._id }, process.env.SECRET_STR, {
      expiresIn: "7d",
    });
    //make a cookie and keep the token in the cookie;
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection;
      maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expires in 7 days;
    });

    res.status(200).json({
      success: true,
      user: foundUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//adding a new user to the db;
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //checking all credentials
    if (!username || !email || !password) {
      return res.status(400).send("invalid credentials provided");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("hashed: " + hashedPassword);

    const localUser = await user.create({
      username,
      email,
      password: hashedPassword,
    });

    //jwt
    const token = jwt.sign({ id: localUser._id }, process.env.SECRET_STR, {
      expiresIn: "7d",
    });
    //make a cookie and keep the token in the cookie;
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });
    res.status(201).json({
      success: true,
      data: {
        user: localUser,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
//logout function;
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.status(200).json({
      success: true,
      message: "Log out is succesfull",
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
