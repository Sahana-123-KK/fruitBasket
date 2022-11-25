const express = require("express");
const router = express.Router();
const {
  createComment,
  getComments,
} = require("../controllers/commentsControllers");
const { verifyToken } = require("../middleware/verification");
router.get("/", (req, res) => {
  res.send("hello welcome to commands section");
});

router.post("/create", verifyToken, createComment);
router.get("/get", getComments);

module.exports = router;
