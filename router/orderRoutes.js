const express = require("express");
const {
  deleteUserOrders,
  createOrder,
  getUserOrders,
} = require("../controllers/ordersController");
const { verifyUser, verifyToken } = require("../middleware/verification");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to orders endpt");
});

router.post("/create", verifyToken, createOrder);
router.get("/getuserorders", verifyToken, getUserOrders);
router.delete("/deleteuserorder/:id", verifyToken, deleteUserOrders);

module.exports = router;
