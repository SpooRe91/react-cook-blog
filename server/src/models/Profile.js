const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [2, 'Profile name, must be at leaast 2 characters long!'],
        required: [true, "Profile name is required"],
        unique: true,
    },
    posts: {
        type: [mongoose.Types.ObjectId],
        ref: "Meal",
    },
    favorites: {
        type: [mongoose.Types.ObjectId],
        ref: "Meal"
    },
    information: {
        type: {
            gender: { type: String },
            hobbies: { type: String },
            occupation: { type: String },
            location: { type: String },
            about: { type: String }
        }
    },
    image: {
        type: String,
        required: true,
    }
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile