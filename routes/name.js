const express = require("express");
const { User } = require("../models/user");
const EJSON = require("ejson");
const BSON = require("bson");
const router = express.Router();

router.post("/", async(req, res) => {
    let Name = await User.findOne({ email: req.body.email });
    if (!Name) {
        return res.status(400).send("Incorrect email");
    } else {
        res.send(
            EJSON.toJSONValue(
                '{"email": ' +
                '"' +
                Name.email +
                '"' +
                ',"name": ' +
                '"' +
                Name.name +
                '"' +
                ',"id": ' +
                '"' +
                Name.id +
                '"' +
                "}"
            )
        );
    }
});
module.exports = router;