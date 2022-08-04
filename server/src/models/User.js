const mongoose = require('mongoose');

const EMAIL_PATTERN = /^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]+$/;
const PASS_PATTERN = /[a-zA-Z0-9]/;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: [10, 'Email-a трябва да е по-дълъг от 10 символа!'],
        required: [true, "Email е задължителен!"],
        unique: true,
        validate: {
            validator(value) {
                return EMAIL_PATTERN.test(value);
            },
            message: 'Email-ът трябва да е валиден и да не съдържа специални символи и знаци!'
        },
    },
    password: {
        type: String,
        required: [true, "Паролата е задължитена!"],
        minlength: [5, 'Паролата ви трябва да е по-дълга от 5 символа!'],
        validate: {
            validator(value) {
                return PASS_PATTERN.test(value);
            },
            message: 'Паролата може да съдържа само букви на Аглийски език, както и цифри!',
        },
    },
    image: {
        type: String,
        default: "",
    },
    favorites: {
        type: [mongoose.Types.ObjectId],
        ref: "Meal"
    },

});

const User = mongoose.model('User', userSchema);
module.exports = User;