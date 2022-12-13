const express = require("express");
const { User} = require("../models/user");
const router = express.Router();
var tmpuser = new Array();
router.post('/', async (req, res)=> {
    console.log("hi");
let user = await User.findOne({email: req.body.email});
if (!user) {
 return res.status(400).send("Incorrect email");
}else{
  const userIds = user.children; // array of user _ids

  // retrieve the full user documents for each _id
     User.find({ _id: { $in: userIds } })
    .populate('children', { _id: 1, name: 1 ,email: 1 })   
    .exec(async (err, users) => {
      if (err) {
        console.error(err);
      } else {
        
        // users is an array of user documents
        users.forEach((user) => {
          tmpuser.push({id:user._id,name: user.name,email: user.email});
          
        });
        console.log(tmpuser);
      res.send(tmpuser);
}});
 } }
    );

module.exports = router;


