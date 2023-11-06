var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var barSchema = new Schema({
    bar_name: {type: String }, 
    adress: {type: String},
    openingHours: {type: String},
    bar_description: {type: String},
    bar_category: {type: String}
});

module.exports = mongoose.model('bars', barSchema);

