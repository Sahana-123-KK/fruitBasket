const express = require("express");
const FruitModel = require("../models/FruitModel");
const {
  verifyToken,
  verifyAdmin,
  verifyUser,
} = require("../middleware/verification");

const {
  createFruits,
  getFruits,
  updateFruits,
  deleteFruit,
  getFruit,
} = require("../controllers/fruitController");

const router = express.Router();

router.post("/create", verifyAdmin, createFruits);

router.get("/", (req, res) => {
  res.send("This is the / pt of api/fruits endpt");
});

router.get("/all", getFruits);
router.get("/:id", getFruit);
router.put("/update/:id", verifyAdmin, updateFruits);
router.delete("/delete/:id", verifyAdmin, deleteFruit);

module.exports = router;
