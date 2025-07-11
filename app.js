const express = require("express");
const app = express();
const router = require("./routes/userRoutes.js");
app.use(express.json());

app.use(router);
// app.get("/home/users", getReq);

module.exports = app;
