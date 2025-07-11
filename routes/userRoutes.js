const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers.js");

router.post("/api/home/login", userControllers.login);
router.post("/api/home/register", userControllers.register);
router.post("/api/home/logout", userControllers.logout);
module.exports = router;
