const express = require("express");
const { User } = require("../models/user");
const mongodb = require("mongodb");
const router = express.Router();

router.get("/fetch/:ChildId", async(req, res) => {
    let user = await User.findOne({ _id: mongodb.ObjectId(req.params.ChildId) });
    if (!user) {
        return res.status(400).send("ID not found");
    } else {
        for (let i = 0; i < user.tasks.length; i++) {
            user.tasks[i]._id = i;
        }
        user.save();
        res.send(user.tasks);
    }
});
router.post("/task/:id", async(req, res) => {
    let user = await User.findOne({ _id: mongodb.ObjectId(req.params.id) });
    if (!user) {
        return res.status(400).send("ID not found");
    } else {
        let newId = user.tasks.length;
        let temp = req.body.tasks[0].description;
        user.tasks.push({ _id: newId, description: temp });
        user.tasks = user.tasks.sort((a, b) => a._id - b._id);
        for (let i = 0; i < user.tasks.length; i++) {
            user.tasks[i]._id = i;
        }
        await user.save();
        res.send(user.tasks);
    }
});
router.post("/delete/:id", async(req, res) => {
    let user = await User.findOne({ _id: mongodb.ObjectId(req.params.id) });
    if (!user) {
        return res.status(400).send("ID not found");
    } else {
        let taskId = req.body.tasks[0]._id;
        user.tasks.pull({ _id: taskId });
        for (let i = 0; i < user.tasks.length; i++) {
            user.tasks[i]._id = i;
        }
        await user.save();
        res.send(user.tasks);
    }
});

module.exports = router;