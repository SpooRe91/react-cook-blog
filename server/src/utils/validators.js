const User = require('../models/User');
const { getErrorMessage } = require("./errorHelpers");

exports.registerValidator = async (req, res, next) => {

    const { email, password, rePassword } = req.body;
    const existing = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    try {

        if (existing) {
            throw new Error('Невалиден e-mail или парола!');
        };

        if (password !== rePassword) {
            throw new Error('Паролите трябва да съвпадат!');
        };
        next();
    } catch (error) {
        res.status(403).json({ message: getErrorMessage(error) });
    };

};