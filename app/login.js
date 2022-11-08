const express = require('express');
const app = express();
const joi = require('joi');
const mongoose = require('mongoose');
const port = process.env.PORT || 9000;
mongoose.connect('mongodb+srv://mahmoud2000:basha1214@cluster0.bcrvo87.mongodb.net/kidsec?retryWrites=true&w=majority');

mongoose.connection.once('open', function () {
  console.log('mongoDB database connection established successfully')
})
listen(port,()=>{
    console.log(`Server listening on port ${port}`);
});

module.exports = app;
