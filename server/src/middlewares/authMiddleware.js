const jwt = require('jsonwebtoken');

const { SESSION_NAME } = require('../config/constants');
const { secret } = require('../config/env');

exports.auth = (req, res, next) => {
    let token = req.cookies[SESSION_NAME];

    if (token) {
        jwt.verify(token, secret, ((err, decodedToken) => {
            if (err) {
                res.clearCookie(SESSION_NAME);
                return res.redirect('/login');
            }
            req.user = decodedToken;
            res.locals.user = decodedToken;
            next();
        }));
    } else {
        next();
    }
};

exports.isAuth = (req, res, next) => {

    if (req.user) {
        next();
    } else {
        return res.render('auth/login', { error: 'You have to login first!' });
    };
};

exports.isGuest = (req, res, next) => {

    if (!req.user) {
        next();
    } else {
        return res.render('home', { error: 'You are already logged in!' });
    };
};