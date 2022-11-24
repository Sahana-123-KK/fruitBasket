///-->For Authentication

const express = require("express");
const { signup, login, logout } = require("../controllers/authControllers");

const router = express.Router();

router.get("/", (req, res) => {
  //   console.log("Welcome");
  res.send("Welcome");
});

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
