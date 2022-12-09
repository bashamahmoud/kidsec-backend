const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("That user already exisits!");
  }else if(req.body.tag ==="child"){
  let tmpuser = await User.findOne({ email: req.body.parent_email });
  console.log(tmpuser.email);
  user = new User({
    name: req.body.name,
    email: req.body.email,
    parent_email: req.body.parent_email,
    password: req.body.password,
    tag: req.body.tag,
    children: req.body.children,});
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    tmpuser.children.push(user.email);
    console.log(tmpuser.children);
    await tmpuser.save();
    res.send(user);
 }
  else {
    user = new User({
      name: req.body.name,
      email: req.body.email,
      parent_email: req.body.parent_email,
      password: req.body.password,
      tag: req.body.tag,
      children: req.body.children,
  });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(user);

  }
});

module.exports = router;
