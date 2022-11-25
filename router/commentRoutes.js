const express = require("express");
const { verify } = require("jsonwebtoken");
const router = express.Router();
const {
  createComment,
  updateComment,
  deletecomment,
  getComments,
} = require("../controllers/commentsControllers");
const { verifyToken } = require("../middleware/verification");
router.get("/", (req, res) => {
  res.send("hello welcome to commands section");
});

router.post("/create", verifyToken, createComment);
router.get("/get", getComments);
router.delete("/delete/:id", verifyToken, deletecomment);
router.put("/update/:id", verifyToken, updateComment);

module.exports = router;
