const mongoose = require('mongoose');

const EMAIL_PATTERN = /^[a-zA-Z]+@[a-zA-Z]+.[a-zA-Z]+$/;
const PASS_PATTERN = /[a-zA-Z0-9]/;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: [10, 'Email must be more than 10 characters long'],
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator(value) {
                return EMAIL_PATTERN.test(value);
            },
            message: 'Email must be valid and may contain only English letters!'
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [5, 'Your password should be at least 5 characters'],
        validate: {
            validator(value) {
                return PASS_PATTERN.test(value);
            },
            message: 'Password must be without non-english characters!',
        },
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;