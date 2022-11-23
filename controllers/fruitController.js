// const express = require("express");
const mongoose = require("mongoose");
// const { findById } = require("../models/FruitModel");
const FruitModel = require("../models/FruitModel");

const createFruits = async (req, res) => {
  //   res.send("This is create endpt");
  let success = false;
  const {
    name,
    description,
    offer,
    quantity,
    price,
    rating,
    image,
    count,
    pieces,
  } = req.body;

  if (
    !name ||
    !description ||
    !offer ||
    !quantity ||
    !price ||
    !rating ||
    !pieces
  ) {
    return res
      .status(402)
      .json({ success, message: "Enter all Mandatory Fields" });
  }
  try {
    const newFruit = await FruitModel.create({
      name,
      description,
      offer,
      quantity,
      price,
      rating,
      image,
      count,
      pieces,
    });
    success = true;

    res.json({ success, newFruit });
    // console.log({ success, newFruit });
  } catch (error) {
    console.log(error);
  }
};

const getFruits = async (req, res) => {
  let success = false;
  try {
    const allFruits = await FruitModel.find();
    success = true;

    res.json({ success, allFruits });
  } catch (error) {
    console.log(error);
  }
};
const updateFruits = async (req, res) => {
  let success = false;
  const {
    name,
    pieces,
    description,
    offer,
    quantity,
    price,
    rating,
    image,
    isAvailable,
    count,
  } = req.body;
  let id = req.params.id;
  let upFruit = {};

  if (name) {
    upFruit.name = name;
  }
  if (description) {
    upFruit.description = description;
  }
  if (offer) {
    upFruit.offer = offer;
  }
  if (quantity) {
    upFruit.quantity = quantity;
  }
  if (price) {
    upFruit.price = price;
  }
  if (rating) {
    upFruit.rating = rating;
  }
  if (image) {
    upFruit.image = image;
  }
  if (isAvailable) {
    upFruit.isAvailable = isAvailable;
  }
  if (count) {
    upFruit.count = count;
  }
  if (pieces) {
    upFruit.pieces = pieces;
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid Id");
      return res.status(404).json({
        success,
        error: "Invalid Id",
      });
    }
    const isExist = await FruitModel.findById(id);
    if (!isExist) {
      console.log("Not found");

      return res.status(404).json({ success, error: "Fruit Not Found" });
    } else {
      const updated = await FruitModel.findByIdAndUpdate(
        id,
        { $set: upFruit },
        { new: true }
      );
      success = true;

      res.json({ success, updated });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteFruit = async (req, res) => {
  const id = req.params.id;
  let success = false;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      //-->Right approach, as this checks whether there is a possiblity of such id, now we need to check whether such id document even exists or not
      console.log("Id Error");
      return res.status(404).json({ success, error: "Id Error" });
    }
    const isExist = await FruitModel.findById(id);
    if (!isExist) {
      console.log("Not found");
      return res.status(404).json({ success, error: "Not found" });
    }
    await FruitModel.findByIdAndDelete(id);
    success = true;
    return res.json({ success, message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};

const getFruit = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(402).json({ error: "Not a valid Id" });
    }
    const isExist = await FruitModel.findById(id);
    if (!isExist) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json(isExist);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createFruits,
  getFruits,
  updateFruits,
  deleteFruit,
  getFruit,
};
