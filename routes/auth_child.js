const Joi = require("joi");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User_child } = require("./../models/user_child");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user_child = await User_child.findOne({ email: req.body.email });
  if (!user_child) {
    return res.status(400).send("Incorrect email or password.");
  }

  const validPassword = await bcrypt.compare(
    req.body.password,
    user_child.password
  );
  if (!validPassword) {
    return res.status(400).send("Incorrect email or password.");
  }
  const token = jwt.sign({ _id: user_child._id }, process.env.PrivateKey);
  res.header('x-auth-token', token).send(_.pick(user_child, ['_id', 'name','parent_email', 'email']));});
function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  const validation = schema.validate(req);
  return validation;
}
//router
module.exports = router;
