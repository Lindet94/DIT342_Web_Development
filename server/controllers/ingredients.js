var express = require('express');
//const { db } = require('../models/cocktail'); ????
var router = express.Router();
const mongoose = require('mongoose');
var Ingredient = mongoose.model('ingredients');
const {
    verifyUser,
} = require("../middleware/auth");
const jwt = require("jsonwebtoken");



//Create ingredient
router.post('/api/ingredients', verifyUser, function (req, res, next) {
    jwt.verify(req.token, process.env.JWT_SECRET, err => {
        if (err) {
            res.sendStatus(401)
        } else {
            var ingredient = new Ingredient(req.body);
            console.log(ingredient.ingredient_name);
            ingredient.save(function (err) {
                if (err) { return next(err); }
                res.status(201).json(ingredient);
            });
        }
    })
});

//Get all ingredients
router.get('/api/ingredients', function (req, res, next) {
    Ingredient.find(function (err, ingredient) {
        if (err) { return next(err); }
        res.status(200).json({ "ingredients": ingredient });
    });
});


//Get certain ingredient with an ID
router.get('/api/ingredients/:id', function (req, res, next) {
    var id = req.params.id;
    Ingredient.findById(req.params.id, function (err, ingredient) {
        if (err) { return next(err); }
        if (ingredient == null) {
            return res.status(404).json(
                { "message": "Ingredient not found" });
        }
        res.status(200).json(ingredient);
    });
});

//Update ingredient with given ID
router.put('/api/ingredients/:id', verifyUser, function (req, res, next) {
    jwt.verify(req.token, process.env.JWT_SECRET, err => {
        if (err) {
            res.sendStatus(401)
        } else {
            var id = req.params.id;
            Ingredient.findById(id, function (err, ingredient) {
                if (err) { return next(err); }
                if (ingredient == null) {
                    return res.status(404).json({ "message": "Ingredient not found" });
                }
                ingredient.ingredient_name = req.body.ingredient_name;
                ingredient.save();
                res.status(200).json(ingredient);
            });
        }
    })

});

//Partially update ingredient
router.patch('/api/ingredients/:id', verifyUser, function (req, res, next) {
    jwt.verify(req.token, process.env.JWT_SECRET, err => {
        if (err) {
            res.sendStatus(401)
        } else {
            var id = req.params.id;
            Ingredient.findById(id, function (err, ingredient) {
                if (err) { return next(err); }
                if (ingredient == null) {
                    return res.status(404).json(
                        { "message": "Ingredient not found" });
                }
                ingredient.ingredient_name = (req.body.ingredient_name || ingredient.ingredient_name);
                ingredient.save();
                res.status(200).json(ingredient);
            });
        }
    })
});


//Delete ingredient with specific ID
router.delete('/api/ingredients/:id', verifyUser, function (req, res, next) {
    jwt.verify(req.token, process.env.JWT_SECRET, err => {
        if (err) {
            res.sendStatus(401)
        } else {
            var id = req.params.id;
            Ingredient.findOneAndDelete({ _id: id }, function (err, ingredient) {
                if (err) { return next(err); }
                if (ingredient == null) {
                    return res.status(404).json(
                        { "message": "Ingredient not found" });
                }
                res.status(200).json(ingredient);
            });
        }
    })
});

//Delete all ingredients
router.delete('/api/ingredients', verifyUser, function (req, res, next) {
    jwt.verify(req.token, process.env.JWT_SECRET, err => {
        if (err) {
            res.sendStatus(401)
        } else {
            Ingredient.remove(function (err, ingredients) {
                if (err) { return next(err); }
                if (ingredients == null) {
                    return res.status(404).json(
                        { "message": "Ingredient not found" });
                }
                res.status(200).json(ingredients);
            });
        }
    })
});



module.exports = router;