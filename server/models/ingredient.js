var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ingredientSchema  = new Schema({
    ingredient_name: {type: String, unique: true, required: true}
});

 module.exports = mongoose.model('ingredients', ingredientSchema);

