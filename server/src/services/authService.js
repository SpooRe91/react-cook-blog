const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SALT_ROUNDS } = require('../config/constants');
const { secret } = require('../config/env');
const { getErrorMessage } = require('../utils/errorHelpers');

/*----------------------register--------------------------*/
exports.register = async ({ email, password }) => {
    try {
        const existing = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

        if (existing) {
            throw new Error('Please enter another e-mail!');
        };

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        let createdUser = await User.create({
            email,
            password: hashedPassword,
        });

        return createdUser;
    } catch (error) {
        return (getErrorMessage(error))
    }
};

/*----------------------login--------------------------*/
exports.login = async (email, password) => {
    let user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    if (!user) {
        throw new Error('Invalid e-mail or password!');
    };

    //Verify password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid e-mail or password!');
    };

    return user;
};

/*----------------------createToken--------------------------*/

exports.createToken = (user) => {
    const payload = { _id: user._id, email: user.email };
    const options = { expiresIn: "2d" };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err, decodedToken) => {

            if (err) {
                return reject(err.message);
            };
            resolve(decodedToken);
        });
    });
};