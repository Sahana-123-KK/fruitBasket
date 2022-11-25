const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const JWTKEY =
  "ILOVEMYSELFANDIWOULDLIKETOTHANKGODWHOGAVEEVERTHINGANDIWOULDSAYILOVEMYSELF";
const verifyToken = async (req, res, next) => {
  try {
    const token =
      //  req.cookies.token || //-->For now made with header token but we will fix this with cookies in future
      req.header("token");
    // console.log(req.header("token"));

    if (!token) {
      return res.status(402).json({ error: "NO Token" });
    }
    const data = jwt.verify(token, JWTKEY);
    if (!data) {
      return res.status(402).json({ error: "Not a valid Token" });
    }
    req.data = data;
    req.userdata = await UserModel.findById(data.user);//-->We want user info completely
    // console.log(req.userdata);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const verifyUser = async (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      //-->Here this id comparison for may be profile id updation, so that a user only updates his profile even after token in authenticated
      if (req.data.isAdmin || req.params.id === req.data.user) {
        next();
      } else {
        return res.status(402).json({ error: "Not allowed" });
      }
    });
  } catch (error) {
    return res.status(402).json({ error: "Not a valid Token" });
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.data.isAdmin) {
        //-->Admin is boolean but we passes as string, JSON.stringify()
        next();
      } else {
        return res.status(402).json({ error: "Not allowed" });
      }
    });
  } catch (error) {
    return res.status(402).json({ error: "Not a valid Token" });
  }
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
