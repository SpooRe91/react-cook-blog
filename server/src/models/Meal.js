const mongoose = require('mongoose');
const URL_PATERN = /^https?:\/\/(.+)/;

const mealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Име на рецептата е задължително!'],
    },
    image: {
        type: String,
        required: [true, 'URL на снимакта е задължителен!'],
        validate: {
            validator: function (value) {
                return URL_PATERN.test(value);
            },
            message: "URL, на снимката трябва да е валиден!"
        }
    },
    fullRecipe: {
        required: [true, 'Опсианиен а рецептата е задължително!'],
        type: String,
    },
    ingredients: {
        type: String,
        required: [true, 'Необходимите съставки са задължителни!'],
    },
    portions: {
        type: Number,
        required: [true, 'Моля въведете брой порции!'],
    },
    difficulty: {
        type: String,
        required: [true, 'Моля въведете трудност за изпълнение на рецептата!'],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    ownerName: {
        type: String,
        ref: 'User'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    likes: {
        type: [mongoose.Types.ObjectId],
        default: [],
        ref: "User",
    }
});

const Meal = mongoose.model('Meal', mealSchema);

exports.Meal = Meal;