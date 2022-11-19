const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
  },
  cost: {
    type: Number,
    required: true,
  },
  items: {
    type: [
      {
        fruitId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "fruit",
        },
        // name: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const OrderModel = mongoose.model("order", OrderSchema);
module.exports = OrderModel;
