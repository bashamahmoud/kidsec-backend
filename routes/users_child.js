const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User_child, validate } = require("../models/user_child");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  // First Validate The Request
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if this user already exisits
  let user_child = await User_child.findOne({ email: req.body.email });
  if (user_child) {
    return res.status(400).send("That user already exisits!");
  } else {
    // Insert the new user if they do not exist yet
    user_child = new User_child({
      name: req.body.name,
      email: req.body.email,
      parent_email: req.body.parent_email,
      password: req.body.password,
    });
    user_child = new User_child(_.pick(req.body, ['name', 'email','parent_email','password']));
    const salt = await bcrypt.genSalt(10);
        user_child.password = await bcrypt.hash(user_child.password, salt);
    await user_child.save();
    res.send(_.pick(user_child, ['_id', 'name', 'email','parent_email']));
  }
});

module.exports = router;

