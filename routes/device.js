const express = require("express");
const { User } = require("../models/user");
const mongodb = require("mongodb");
const router = express.Router();

router.get("/fetch_Name/:id", async(req, res) => {
    let user = await User.findOne({ _id: mongodb.ObjectId(req.params.id) });
    if (!user) {
        return res.status(400).send("ID not found");
    } else {
      res.send(user.deviceName);
    }
});
router.get("/fetch_Token/:id", async(req, res) => {
    let user = await User.findOne({ _id: mongodb.ObjectId(req.params.id) });
    if (!user) {
        return res.status(400).send("ID not found");
    } else {
      res.send(user.deviceToken);
    }
});
router.post("/devicename/:id", async(req, res) => {
    let user = await User.findOne({ _id: mongodb.ObjectId(req.params.id) });
    if (!user) {
        return res.status(400).send("ID not found");
    } else {
        user.deviceName = req.body.deviceName;
        await user.save();
        res.send(user);
    }
});
router.post("/devicetoken/:id", async(req, res) => {
    let user = await User.findOne({ _id: mongodb.ObjectId(req.params.id) });
    if (!user) {
        return res.status(400).send("ID not found");
    } else {
        user.deviceToken = req.body.deviceToken;
        await user.save();
     
        res.send(user);
    }
});


module.exports = router;