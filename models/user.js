const Joi = require("joi");
const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
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
      required: false,
      minlength: 0,
      maxlength: 255,
      unique: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    tag: {
      type: String,
      required: true,
      minlength: 0,
      maxlength: 1024,
    },
    children: {
      type: [String],
      required: false,
      minlength: 0,
      maxlength: 1024,
    },
  })
);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(5).required().email(),
    parent_email: Joi.string().min(0),
    password: Joi.string().min(5).required(),
    tag: Joi.string().required(),
    children: Joi.array().items(Joi.string()),
  });

  const validation = schema.validate(user);
  return validation;
}

exports.User = User;
exports.validate = validateUser;
