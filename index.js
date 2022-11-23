const express = require("express");
// const mongoose = require("mongoose");
const connectDb = require("./db/connect");
const cors = require("cors");
const cookie = require("cookie-parser");
const app = express();
app.use(cookie());

app.use(cors());
app.use(express.json());
connectDb();

app.get("/", (req, res) => {
  res.send("Welcome to fruitBasket Backend");
});

app.use("/api/fruits", require("./router/fruitRoutes"));
app.use("/api/auth", require("./router/authRoutes"));
app.use("/api/orders", require("./router/orderRoutes"));

app.listen(8000, () => {
  //--> We use listen for setting port
  console.log("Connected to fruitBasket Server");
});
