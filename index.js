const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
require('dotenv').config()
const mongoose = require("mongoose");
const users = require("./routes/users");
const auth = require("./routes/auth");
const name = require("./routes/name");
const children= require("./routes/children");
const tasks= require("./routes/task");
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
app.use("/api/names", name);
app.use("/api/children", children);
app.use("/api/tasks", tasks);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
