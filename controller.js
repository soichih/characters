'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');

const model = require('./model');

module.exports = router;

const needAuth = jwt({secret: 'testpass', algorithms: ['HS256']});
function isAdmin(req) {
    if(!req.user) return false;
    if(!req.user.scopes) return false;
    if(!req.user.scopes.includes("admin")) return false;
    return true;
}

router.get('/chs', async (req, res, next) => {
    let recs = await model.Characters.find({}, '-home -location').exec();
    res.json(recs);
})

router.get('/ch/:id', async (req, res, next) => {
    let rec = await model.Characters.findOne({_id: req.params.id}).exec();
    res.json(rec);
})

router.post('/ch', needAuth, async (req, res, next) => {
    if(!isAdmin(req)) return next({message: "not admin"});
    let rec = await model.Characters.create(req.body);
    res.json({message: "created new character!", rec});
})

router.put('/ch/:id', needAuth, async (req, res, next) => {
    if(!isAdmin(req)) return next({message: "not admin"});
    await model.Characters.findOneAndUpdate({_id: req.params.id}, req.body).exec();
    res.json({message: "record updated"});
})

router.delete('/ch/:id', needAuth, async (req, res, next) => {
    if(!isAdmin(req)) return next({message: "not admin"});
    await model.Characters.deleteOne({_id: req.params.id});
    res.json({message: "successfully removed"});
})


