const User = require('../models/User');
const { getErrorMessage } = require("./errorHelpers");

exports.registerValidator = async (req, res, next) => {

    const { email, password, rePassword } = req.body;
    const existing = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    try {

        if (existing) {
            throw new Error('Invalid e-mail or password!');
        };

        if (password !== rePassword) {
            throw new Error('Passwords must match!');
        };
        next();
    } catch (error) {
        res.status(403).json({ message: getErrorMessage(error) });
    };

};