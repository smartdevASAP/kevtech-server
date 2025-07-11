const bcrypt = require("bcryptjs");
const user = require("../models/userModel.js");

//getting a user from the DB;
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedUser = await user.findOne({ email });

    //case:INCOMPLETE INFORMATION
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }
    //when providing wrong information;
    if (!loggedUser) {
      return res.status(400).json({
        success: false,
        message: "invalid email or password",
      });
    }
    //WHEN THE USER EXISTS IN THE DATABASE;
    const isMatch = await bcrypt.compare(password, loggedUser.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      message: "login was succesful",
    });
  } catch (err) {
    return res.status(404).json({
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
    res.status(201).json({
      success: true,
      data: {
        user: localUser,
      },
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
//logout function;
exports.logout = async (req, res) => {
  try {
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
