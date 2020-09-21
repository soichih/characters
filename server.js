#!/usr/bin/env node

const express = require('express')
const app = express()
const cors = require('cors')
const model = require('./model');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

//show method/url requested
app.use((req, res, next)=>{
    console.debug(req.method, req.url);
    next();
});

app.use(express.static('view/dist'))

const controller = require('./controller');
app.use('/api', controller);

//error handler
app.use((err, req, res, next)=>{
    console.error(err);
    res.status(500);
    res.json(err);
});

model.db.once('open', function() {
    app.listen(3000, () => {
        console.log("server started on localhost:3000");
    })
});


