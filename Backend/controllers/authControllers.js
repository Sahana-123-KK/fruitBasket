const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWTKEY =
  "ILOVEMYSELFANDIWOULDLIKETOTHANKGODWHOGAVEEVERTHINGANDIWOULDSAYILOVEMYSELF";

const signup = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  let success = false;
  try {
    if (!name || !email || !password || !isAdmin) {
      //   con;
      return res
        .status(402)
        .json({ success, error: "Enter all Mandatory Fields" });
    }
    const isExist = await UserModel.findOne({ email });
    if (isExist) {
      return res.status(403).json({ error: "Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const newUser = await UserModel.create({
      name,
      email,
      password: hashed,
      isAdmin,
    });
    const token = jwt.sign(
      { user: newUser._id, isAdmin: newUser.isAdmin },
      JWTKEY
    );
    success = true;

    res
      .cookie("jwtoken", token, { httpOnly: true })
      .json({ success, user: { name: newUser.name, email: newUser.email } });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  let success = false;
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(403).json({ error: "Fill All Mandatory Details" });
  }

  try {
    const isEmail = await UserModel.findOne({ email });
    if (!isEmail) {
      return res.status(403).json({ error: "No Account Found" });
    }
    const isMatch = await bcrypt.compare(password, isEmail.password);
    if (!isMatch) {
      return res.status(403).json({ success, error: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { user: isEmail._id, isAdmin: isEmail.isAdmin },
      JWTKEY
    );
    success = true;
    res
      .cookie("jwtoken", token, { httpOnly: true })
      .json({ success, user: { name: isEmail.name, email } });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signup, login };
