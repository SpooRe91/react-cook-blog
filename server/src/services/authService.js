const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SALT_ROUNDS } = require('../config/constants');
const { secret } = require('../config/env');

/*----------------------register--------------------------*/
exports.register = async ({ email, password }) => {

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    let createdUser = await User.create({
        email,
        password: hashedPassword,
    });

    return createdUser;
};

/*----------------------login--------------------------*/
exports.login = async (email, password) => {
    let user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    if (!user) {
        throw {
            message: 'Invalid e-mail or password!'
        }
    };
    //Verify password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw {
            message: 'Invalid e-mail or password!'
        };
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
                return reject(err);
            };
            resolve(decodedToken);
        });
    });
}

