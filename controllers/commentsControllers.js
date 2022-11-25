const { default: mongoose } = require("mongoose");
const commentModel = require("../models/CommentsModel");

const createComment = async (req, res) => {
  //   res.send("hello");
  let success = false;
  try {
    const { comment, fruitId, rating } = req.body;
    if (!comment || !fruitId || !rating) {
      return res
        .status(402)
        .json({ success, error: "Fill All Mandatory Fields" });
    }

    const newComment = await commentModel.create({
      user: req.userdata._id,
      fruitId,
      rating,
      comment,
      name: req.userdata.name,
    });
    success = true;

    res.json({ success, message: "Your Comment has been Added Successfully" });
  } catch (error) {
    console.log(error);
  }
};
const getComments = async (req, res) => {
  let success = false;
  try {
    const allcomments = await commentModel.find();
    success = true;
    res.json({ success, allcomments });
  } catch (error) {
    console.log(error);
  }
};
const deletecomment = async (req, res) => {
  const { id } = req.params;
  let success = false;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(402).json({ success, error: "Invalid id" });
    }
    const isExist = await commentModel.findById(id);
    if (!isExist) {
      return res.status(404).json({ success, error: "Not Found" });
    }
    if (req.data.user !== isExist.user.toString()) {
      return res.status(403).json({ success, error: "Not Allowed" });
    }

    await commentModel.findByIdAndDelete(id);
    success = true;
    res.json({ success, message: "Comment Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { comment, rating } = req.body;
  let success = false;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(402).json({ success, error: "Invalid id" });
    }
    const isExist = await commentModel.findById(id);
    if (!isExist) {
      return res.status(404).json({ success, error: "Not Found" });
    }
    if (req.data.user !== isExist.user.toString()) {
      return res.status(403).json({ success, error: "Not Allowed" });
    }
    let updatecomm = {};
    if (comment) {
      updatecomm.comment = comment;
    }
    if (rating) {
      updatecomm.rating = rating;
    }

    const update = await commentModel.findByIdAndUpdate(
      id,
      { $set: updatecomm },
      { new: true }
    );
    success = true;
    res.json({
      success,
      message: "Your Comment Has Been Updated Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createComment, getComments, deletecomment, updateComment };
