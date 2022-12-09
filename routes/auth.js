const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Incorrect email or password.");
  }
  const validPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validPassword) {
    return res.status(400).send("Incorrect email or password.");
  }
  res.send(true);
  function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  const validation = schema.validate(req);
  return validation;
}});
module.exports = router;

