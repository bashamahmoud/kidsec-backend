const express = require("express");
const { User } = require("../models/user");
const mongodb = require("mongodb");
const router = express.Router();

router.get("/:fetch", async(req, res) => {
    let Name = await User.findOne({
        $or: [{ email: req.params.fetch }, { name: req.params.fetch }],
    }, { id: 1 });
    if (!Name) {
        return res.status(400).send("Incorrect email");
    } else {
        res.send(Name);
    }
});

router.get("/byID/:id", async(req, res) => {
    if (!mongodb.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid ObjectId");
    }
    let Name = await User.findOne({
        $or: [{ _id: mongodb.ObjectId(req.params.id) }],
    }, { email: 1, name: 1 });
    if (!Name) {
        return res.status(400).send("Incorrect email");
    } else {
        res.send(Name);
    }
});
module.exports = router;