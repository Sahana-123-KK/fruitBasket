const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
  },
  name: {
    type: String,
    required: true,
  },
  fruitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fruit",
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  createdAt: {
    //-->Required to show time when the comment was written by the user
    type: Date,
    default: Date.now,
  },
});

const commentModel = mongoose.model("comment", commentSchema);
module.exports = commentModel;
