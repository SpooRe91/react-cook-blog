const router = require('express').Router();
const User = require('../models/User');

const authService = require('../services/authService');
const { SESSION_NAME } = require('../config/constants');
const { registerValidator } = require('../utils/validators');
const { getErrorMessage } = require('../utils/errorHelpers');

const { isAuth, isGuest } = require('../middlewares/authMiddleware');
const { modelValidator } = require('../middlewares/modelValidatorMiddleware');


router.post('/register', isGuest, modelValidator(User), registerValidator, async (req, res, next) => {

    const { email, password } = req.body;

    try {

        const created = await authService.register({ email, password });
        const token = await authService.createToken(created);

        if (token) {

            const userInfo = {
                id: created._id,
                email: created.email,
            }

            res.cookie(SESSION_NAME, token, { httpOnly: true });//automatic login after registration
            res.status(201).json(userInfo)
        } else {
            throw new Error('Unable to register such user! Please try again!')
        }

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: getErrorMessage(error) });
    };
});


router.post('/login', isGuest, async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await authService.login(email, password);
        const token = await authService.createToken(user);

        if (!token) {
            throw new Error('Unable to login with the given credentials!')
        };

        const userInfo = {
            id: user._id,
            email: user.email,
        }

        res.cookie(SESSION_NAME, token, { httpOnly: true });
        res.status(200).json(userInfo);

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: getErrorMessage(error) });
    };
});


router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(SESSION_NAME);
    res.status(204).end();
    console.log("Logged out!");
});
module.exports = router;