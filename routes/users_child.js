const { User_child, validate } = require('../models/user_child');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if this user already exisits
    let user_child = await User_child.findOne({ email: req.body.email });
    if (user_child) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user_child = new User_child({
            name: req.body.name,
            email: req.body.email,
            parent_email: req.body.parent_email,
            password: req.body.password
        });
        await user_child.save();
        res.send(user_child);
    }
});

module.exports = router;
process.on('uncaughtException', function (err) {
});
