const express = require("express");
// const mongoose = require("mongoose");
const connectDb = require("./db/connect");
const cors = require("cors");
// const cookie = require("cookie-parser");
const cookieparser = require("cookie-parser");

const app = express();
app.use(cookieparser());

app.use(cors({ credentials: true })); //When we exchage cookies and stuff , we need to make this true and in frontend credentials: 'include' must be included when we use cors
app.use(express.json());
connectDb();

app.get("/", (req, res) => {
  res.send("Welcome to fruitBasket Backend");
});

app.use("/api/fruits", require("./router/fruitRoutes"));
app.use("/api/auth", require("./router/authRoutes"));
app.use("/api/orders", require("./router/orderRoutes"));
app.use("/api/comments", require("./router/commentRoutes"));

app.listen(8000, () => {
  //--> We use listen for setting port
  console.log("Connected to fruitBasket Server");
});
