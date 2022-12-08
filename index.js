const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
require('dotenv').config()
const mongoose = require("mongoose");
const users_parent = require("./routes/users_parent");
const users_child = require("./routes/users_child");
const auth_parent = require("./routes/auth_parent");
const auth_child = require("./routes/auth_child");
const express = require("express");
const app = express();
mongoose
  .connect(
    "mongodb+srv://mahmoud2000:basha1214@cluster0.bcrvo87.mongodb.net/kidsec?retryWrites=true&w=majority"
  )
  .then(() => console.log("Now connected to MongoDB!"))
  .catch((err) => console.error("Something went wrong", err));



app.use(express.json()); // to enable express from understanding json

app.use("/api/users_parent", users_parent);
app.use("/api/users_child", users_child);
app.use("/api/auth_parent", auth_parent);
app.use("/api/auth_child", auth_child);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
