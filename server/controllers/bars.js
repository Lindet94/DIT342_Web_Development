var express = require('express');
var router = express.Router();
var Bars = require('../models/bar');
const mongoose = require('mongoose');


//Create bar
router.post('/api/bars', function(req, res, next) {
    var bar = new Bars(req.body);
    console.log(bar.bar_name);

    bar.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(bar);
    });
});



//Get all bars
router.get('/api/bars', function(req, res, next) {
    Bars.find(function(err, bar) {
        if (err) { return next(err); }
        res.status(201).json({'bars': bar });
    });
});


router.delete('/api/bars/:id', function(req, res, next) {
    var id = req.params.id;
    Bars.findOneAndDelete({_id: id}, function(err, bar) {
        if (err) { return next(err); }
        if (bar === null) {
            return res.status(404).json({'message': 'Bars not found'});
        }
        res.status(200).json(bar);
    });
});


//get only names of bars: FIELD SELECTION
router.get('/api/bars/onlynames', function(req, res, next) {
    var query = Bars.find({}).select('bar_name -_id');
    query.exec(function (err, bar_name) {
        if (err) return next(err);
        res.send(bar_name);
    });
});


//Update bar with given ID
router.put('/api/bars/:id', function(req, res, next) {
    var id = req.params.id;
    Bars.findById(id, function(err, bar) {
        if (err) { return next(err); }
        if (bar == null) {
            return res.status(404).json({"message": "Ingredient not found"});
        }
        bar.bar_name = req.body.bar_name;
        bar.adress = req.body.adress;
        bar.bar_description = req.body.bar_description;
        bar.bar_category = req.body.bar_category;
        bar.save();
        res.status(200).json(bar);
    });
});




module.exports = router;