var express = require('express');
const { db } = require('../models/cocktail');
var router = express.Router();

//var Cocktails = require('../models/cocktail');
var Ingredient = require('../models/ingredient');

const mongoose = require('mongoose');
var Cocktails = mongoose.model('cocktails');
var Ingredient = mongoose.model('ingredients');

const {
    verifyUser,
} = require("../middleware/auth");
const jwt = require("jsonwebtoken");



// ----- POST REST-API ------
router.post('/api/cocktails', verifyUser, (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_SECRET, err => {
        if (err) {
            res.sendStatus(401)
        } else {
            var cocktail = new Cocktails(req.body);
            cocktail.save(function (err, cocktail) {
                if (err) { return next(err); }
                res.status(201).json(cocktail);
            })
        }
    })
})

//Search specific cocktail
router.post('/api/search-cocktail', function (req, res, next) {
    try {
        if (!req.body) {
            res.status(500).send("input is missing");
        } else {
            Cocktails.find({ name: req.body.search.text.trim() }, (err, cocktail) => {
                if (err) {
                    res.status(500).send("Error");
                } else {
                    responseMsg = {
                        "Body": cocktail
                    }
                    res.status(200).send(responseMsg);
                }
            })
        }
    } catch (err) {
        console.log('Error::', err);
    }
});


//Post ingredients in cocktail
router.post('/api/cocktails/:id/ingredients', verifyUser, function (req, res, next) {
    jwt.verify(req.token, process.env.JWT_SECRET, err => {
        if (err) {
            res.sendStatus(401)
        } else {
            var id = req.params.id;
            Cocktails.findById(id, function (err, cocktail) {
                if (err) { return next(err); }
                if (cocktail === null) {
                    return res.status(404).json({ 'message': 'Cocktail not found!' });
                }
                cocktail.ingredients = req.body;
                cocktail.save(function (err, ingredient) {
                    if (err) { return next(err); }
                    res.status(201).json(ingredient);
                })
            });
        }
    })
});

// ----- GET REST-API ------


//Get ingredients in cocktail
router.get('/api/cocktails/:id/ingredients', function (req, res, next) {
    var id = req.params.id;
    Cocktails.findById(id, function (err, cocktail) {
        if (err) { return next(err); }
        if (cocktail === null) {
            return res.status(404).json({ 'message': 'Cocktail not found!' });
        }
        res.status(200).json(cocktail.ingredients);
        console.log(cocktail.ingredients);
    });
});

//Post ingredients in cocktail
router.post('/api/cocktails/:id/ingredients', function (req, res, next) {
    jwt.verify(req.token, process.env.JWT_SECRET, err => {
        if (err) {
            res.sendStatus(401)
        } else {
            var id = req.params.id;
            Cocktails.findById(id, function (err, cocktail) {
                if (err) { return next(err); }
                if (cocktail === null) {
                    return res.status(404).json({ 'message': 'Cocktail not found!' });
                }
                cocktail.ingredients = req.body;
                cocktail.save(function (err, ingredient) {
                    if (err) { return next(err); }
                    res.status(201).json(ingredient);
                })
            });
        }
    })
});

//Get specific ingredient in Cocktail
router.get('/api/cocktails/:id/ingredients/:idIngredient', function (req, res, next) {
    var id = req.params.id;
    var idIngredient = req.params.idIngredient;
    console.log(id);
    console.log(idIngredient);
    Cocktails.findById(id, function (err, cocktail) {
        if (err) { return next(err); }
        if (cocktail === null) {
            return res.status(404).json({ 'message': 'Cocktail not found!' });
        }
        Ingredient.findById(idIngredient, function (err, ingredient) {
            if (err) { return next(err); }
            if (ingredient === null) {
                return res.status(404).json({ 'message': 'Ingredient not found!' });
            }
            res.status(200).json(idIngredient);
        })
    })
})


//Delete specific ingredient in Cocktail
router.delete('/api/cocktails/:id/ingredients/:idIngredient', verifyUser, function (req, res, next) {
    jwt.verify(req.token, process.env.JWT_SECRET, err => {
        if (err) {
            res.sendStatus(401)
        } else {
            var id = req.params.id;
            var idIngredient = req.params.idIngredient;
            console.log(id);
            console.log(idIngredient);
            Cocktails.findById(id, function (err, cocktail) {
                console.log(cocktail.ingredients.pull({ _id: req.params.idIngredient }))
                console.log(cocktail)
                cocktail.save();
                if (err) { return next(err); }
                if (cocktail === null) {
                    return res.status(404).json({ 'message': 'Cocktail not found!' });
                }
                Ingredient.findOneAndDelete(idIngredient, function (err, ingredient) {
                    if (err) { return next(err); }
                    if (ingredient === null) {
                        return res.status(404).json({ 'message': 'Ingredient not found!' });
                    }
                    res.status(200).json(ingredient);
                })
            })
        }
    })
})

router.get('/api/cocktails', async (req, res) => {
    Cocktails.find(function (err, cocktails) {
        if (err) { return next(err); }
        res.status(200).json({ 'cocktails': cocktails });
    })
})


//Get specific cocktail with ID
router.get('/api/cocktails/:id', function (req, res, next) {
    var id = req.params.id;
    Cocktails.findById(id, function (err, cocktail) {
        if (err) { return next(err); }
        if (cocktail === null) {
            return res.status(404).json({ 'message': 'Cocktail not found!' });
        }
        res.status(200).json(cocktail);
    });
});

//Get all ingredients for each cocktail
router.get('/api/cocktails/ingredientsName/:id', function (req, res, next) {
    var id = req.params.id;
    const idCollection = []
    const idSorter = []
    const IngredientList = []
    var itemName
    idCollection.push(id)
    Cocktails.findById(id, function (err, cocktail) {
        if (err) { return next(err); }
        if (cocktail === null) {
            return res.status(404).json({ 'message': 'Cocktail not found!' });
        }
        var count = (Object.keys(cocktail.ingredients).length)
        for (var i = 0; i < count; i++) {
            var temp = cocktail.ingredients[i]
            idSorter.push(temp._id)
        }
        for (var i = 0; i < idSorter.length; i++) {
            var temp3 = idSorter[i]
            mongoose.model('ingredients').findById(temp3, function (err, ingredient) {
                if (err) { return next(err); }
                if (ingredient == null) {
                    return res.status(404).json(
                        { "message": "Ingredient not found" });
                }
                itemName = ingredient.ingredient_name
                IngredientList.push(itemName)
                if (idSorter.length == IngredientList.length) {
                    res.status(200).json(IngredientList)
                }

            });

        }
    }
    )
});


// ----- DELETE REST-API ------


//Delete specific cocktail
router.delete('/api/cocktails/:id', verifyUser, function (req, res, next) {
    jwt.verify(req.token, process.env.JWT_SECRET, err => {
        if (err) {
            res.sendStatus(401)
        } else {
            var id = req.params.id;
            Cocktails.findOneAndDelete({ _id: id }, function (err, cocktail) {
                if (err) { return next(err); }
                if (cocktail === null) {
                    return res.status(404).json({ 'message': 'Cocktail not found' });
                }
                res.status(200).json(cocktail);
            });
        }
    })
});

//Delete all cocktails
router.delete('/api/cocktails/', verifyUser, function (req, res, next) {
    jwt.verify(req.token, process.env.JWT_SECRET, err => {
        if (err) {
            res.sendStatus(401)
        } else {
            var id = req.params.id;
            Cocktails.deleteMany(function (err, cocktail) {
                if (err) { return next(err); }
                if (cocktail === null) {
                    return res.status(404).json({ 'message': 'Cocktail not found' });
                }
                res.status(200).json(cocktail);
            });
        }
    })
});

//Update cocktail with ID
router.put('/api/cocktails/:id', verifyUser, function (req, res, next) {
    jwt.verify(req.token, process.env.JWT_SECRET, err => {
        if (err) {
            res.sendStatus(401)
        } else {
            var id = req.params.id;
            Cocktails.findById(id, function (err, cocktail) {
                if (err) { return next(err); }
                if (cocktail == null) {
                    return res.status(404).json({ "message": "Cocktail not found" });
                }
                cocktail.cocktail_name = req.body.cocktail_name;
                cocktail.glass = req.body.glass;
                cocktail.ingredients = req.body.ingredients;
                cocktail.save();
                res.status(200).json(cocktail);
            });
        }
    })
});


module.exports = router;
