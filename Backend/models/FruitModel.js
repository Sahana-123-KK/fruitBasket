const mongoose = require("mongoose");

const FruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
    // required: true,
  },
  offer: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    default: 10,
  },
});

const FruitModel = mongoose.model("fruit", FruitSchema);
module.exports = FruitModel;
