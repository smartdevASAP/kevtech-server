const app = require("./app.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

//CONNECTION TO DB
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URI);
    console.log("database connected succesfully");
  } catch (err) {
    console.log("error in the database connection " + err.message);
  }
};

app.listen(process.env.PORT_NUMBER, () => {
  connectToDB();
  console.log(
    `server running on port http://localhost:${process.env.PORT_NUMBER}`
  );
});
