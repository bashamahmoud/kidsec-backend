const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
require('dotenv').config()
const mongoose = require("mongoose");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const app = express();
mongoose
  .connect(
    process.env.DB_connection,
    {useNewUrlParser: true},
    ()=> console.log("connected to cluster")
  );



app.use(express.json()); // to enable express from understanding json

app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
