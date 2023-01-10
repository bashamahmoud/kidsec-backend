const express = require("express");
const { User } = require("../models/user");
const router = express.Router();

router.get("/:email", async(req, res) => {
    let Name = await User.find({ email: req.params.email }, { email: 1, name: 1, id: 1 });
    if (!Name) {
        return res.status(400).send("Incorrect email");
    } else {
        res.send(Name);
    }
});
module.exports = router;