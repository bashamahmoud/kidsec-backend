const express = require("express");
const { User } = require("../models/user");
const router = express.Router();

router.get("/:fetch", async(req, res) => {
    let Name = await User.findOne({ $or: [{ email: req.params.fetch }, { name: req.params.fetch }] }, { email: 1, name: 1, id: 1 });
    if (!Name) {
        return res.status(400).send("Incorrect email");
    } else {
        res.send(Name);
    }
});
module.exports = router;