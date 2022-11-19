const mongoose = require("mongoose");

const OrderModel = require("../models/OrderModel");
const FruitModel = require("../models/FruitModel");

const createOrder = async (req, res) => {
  let success = false;
  const { cost, items, address } = req.body;

  if (!cost || !items || !address) {
    return res.status(402).json({ error: "Enter all Mandatory Fields" });
  }
  try {
    //-->When order is placed, not only order is created,but the no of the order items also will be reduced.
    let user = req.data.user; //-->Only after authentication,so we will use that user id from cookie
    const { fruitId } = items[0];
    const tobe = await FruitModel.findById(fruitId);
    if (tobe.count > 0) {
      let countobj = { count: tobe.count - 1 }; //-->Decreasing the count of the fruit ordered
      const newOrder = await OrderModel.create({ user, cost, items, address });
      const updateCount = await FruitModel.findByIdAndUpdate(
        fruitId,
        { $set: countobj },
        { new: true }
      );
      success = true;
      res.json({ success, newOrder, updateCount });
    } else {
      return res.status(402).json({ error: "No Stock to Place Order" });
    }
  } catch (error) {
    console.log("error");
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ user: req.data.user });
    res.json({ orders });
  } catch (error) {
    console.log(error);
  }
};

const deleteUserOrders = async (req, res) => {
  let success = false;
  const { id } = req.params;
  try {
    const orderCheck = await OrderModel.findById(id);
    // console.log(orderCheck.user.toString());
    // console.log(req.data.user);
    if (orderCheck.user.toString() === req.data.user) {
      //-->If .toString() is used to convert object id to the normal number string format
      const { fruitId } = orderCheck.items[0];

      const updateFruit = await FruitModel.findById(fruitId);
      let upcount = { count: updateFruit.count + 1 };
      const updates = await FruitModel.findByIdAndUpdate(
        fruitId,
        {
          $set: upcount,
        },
        { new: true }
      );
      await OrderModel.findByIdAndDelete(id);
      success = true;
      res.json({ success, message: "Order Deleted Successfully", updates });
    } else {
      return res.status(403).json({ success, error: "Not Algglowed" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createOrder, getUserOrders, deleteUserOrders };
