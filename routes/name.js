const express = require("express");
const { User} = require("../models/user");
const router = express.Router();


router.get('/', async (req, res)=> {
let Name= await User.findOne({email: req.body.email});
if (!Name) {
    return res.status(400).send("Incorrect email");
  }
  else{
    res.send(Name.name);
  }

});
module.exports = router;


