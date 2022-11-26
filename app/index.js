const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users_parent = require('./../routes/users_parent');
const express = require('express');
const app = express();
mongoose.connect('mongodb+srv://mahmoud2000:basha1214@cluster0.bcrvo87.mongodb.net/kidsec?retryWrites=true&w=majority')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));
app.use(express.json());
app.use('/api/users_parent', users_parent);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
