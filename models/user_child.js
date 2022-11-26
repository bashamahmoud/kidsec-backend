const Joi = require("joi");
const mongoose = require("mongoose");

const User_child = mongoose.model(
  "User_child",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    parent_email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
  })
);

function validateUser(user_child) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(5).required().email(),
    parent_email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).required(),
  });

  const validation = schema.validate(user_child);
  return validation;
}

exports.User_child = User_child;
exports.validate = validateUser;
