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

module.exports = { createComment, getComments };
