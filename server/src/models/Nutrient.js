const mongoose = require('mongoose');

const nutrientShema = new mongoose.Schema({});
const Nutrient = mongoose.model('Nutrient', nutrientShema);

exports.Nutrient = Nutrient;