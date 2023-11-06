var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('../models/ingredient');

var cocktailSchema = new Schema({
    cocktail_name: {type: String, unique: true, required: true},
    glass: {type: String },
    cocktailRating: {type: Number},
    recipe: {type: String},
    recipe_ingredients: {type: String},
    ingredients: ['ingredients']
});


module.exports = mongoose.model('cocktails', cocktailSchema);







