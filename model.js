'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/controller', {useNewUrlParser: true, useUnifiedTopology: true});
exports.db = mongoose.connection;

exports.Characters = mongoose.model("Characters", new mongoose.Schema({
    name: String,
    gender: String, //male, female, or nonbinary
    birthdate: Date,
    height: Number,
    weight: Number,
    home: String,
    location: String,

    //administrative
    createDate: {type: Date, default: new Date() },
    updateDate: {type: Date, default: new Date() },
}));
