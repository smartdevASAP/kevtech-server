// const express = require("express");
// const router = express.Router();
// const userControllers = require("../controllers/userControllers.js");

// router.post("/login", userControllers.login);
// router.post("/register", userControllers.register);
// router.post("/logout", userControllers.logout);
// module.exports = router;

const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers.js");

// HEALTH CHECK inside /api/home
router.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

router.post("/login", userControllers.login);
router.post("/register", userControllers.register);
router.post("/logout", userControllers.logout);

module.exports = router;
