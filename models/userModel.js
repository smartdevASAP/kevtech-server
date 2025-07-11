const mongoose = require("mongoose");
//creating a userSchema;
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

//creating a model;
const user = mongoose.model("user", userSchema);
module.exports = user;
