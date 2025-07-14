const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const router = require("./routes/userRoutes.js");
const allowedOrigins = ["https://kelvtech-web.vercel.app"];
//middleware configuration;
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

//all routes are nested here
app.use("/api/home", router);
// app.get("/home/users", getReq);

module.exports = app;
