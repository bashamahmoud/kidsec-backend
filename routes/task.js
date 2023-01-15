const express = require("express");
const { User } = require("../models/user");
const mongodb = require("mongodb");
const router = express.Router();

router.get("/task/:id", async (req, res) => {
  let user = await User.findOne({ _id: mongodb.ObjectId(req.params.id) });
  if (!user) {
    return res.status(400).send("ID not found");
  } else {
    res.send(user.tasks);
  }
});
router.post("/task/:id", async (req, res) => {
  let user = await User.findOne({ _id: mongodb.ObjectId(req.params.id) });
  if (!user) {
    return res.status(400).send("ID not found");
  } else {
    let newId = user.tasks.length;
    let temp = req.body.tasks;
    user.tasks.push({ _id: newId, description: temp });
    user.tasks = user.tasks.sort((a, b) => a._id - b._id);
    await user.save();
  }
});

module.exports = router;
