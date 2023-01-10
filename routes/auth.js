const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async(req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({
        $or: [{ email: req.body.email }, { name: req.body.name }],
    });
    if (!user) {
        return res.status(400).send("Incorrect Credentials.");
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send("Incorrect Credentials.");
    }
    res.send(true);

    function validate(req) {
        const schema = Joi.object({
            email: Joi.string().min(5).max(255).email(),
            name: Joi.string().min(4).max(255),
            password: Joi.string().min(5).max(255).required(),
        });
        const validation = schema.validate(req);
        return validation;
    }
});
module.exports = router;