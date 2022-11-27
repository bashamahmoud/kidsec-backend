const Joi = require("joi");
const mongoose = require("mongoose");

const User_parent = mongoose.model(
  "User_parent",
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
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
  })
);

function validateUser(user_parent) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).required(),
  });

  const validation = schema.validate(user_parent);
  return validation;
}

exports.User_parent = User_parent;
exports.validate = validateUser;
