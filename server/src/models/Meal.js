const mongoose = require('mongoose');

const URL_PATERN = /^https?:\/\/(.+)/;

const mealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Recipe name is requred!'],
    },
    image: {
        type: String,
        required: [true, 'Imgage URL is required!'],
        validate: {
            validator: function (value) {
                return URL_PATERN.test(value);
            },
            message: "Image must be a valid URL"
        }
    },
    fullRecipe: {
        required: [true, 'Full recipe is requred!'],
        type: String,
    },
    ingredients: {
        type: String,
        required: [true, 'Incredients are requred!']
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Meal = mongoose.model('Meal', mealSchema);

exports.Meal = Meal;