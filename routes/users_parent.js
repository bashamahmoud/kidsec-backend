const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User_parent, validate } = require("../models/user_parent");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  // First Validate The Request
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if this user already exisits
  let user_parent = await User_parent.findOne({ email: req.body.email });
  if (user_parent) {
    return res.status(400).send("That user already exisits!");
  } else {
    // Insert the new user if they do not exist yet
    user_parent = new User_parent({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    user_parent = new User_parent(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user_parent.password = await bcrypt.hash(user_parent.password, salt);
    await user_parent.save();
    res.send(_.pick(user_parent, ['_id', 'name', 'email']));
  }
});

module.exports = router;

