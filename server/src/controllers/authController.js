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
            res.cookie(SESSION_NAME, token, { httpOnly: true });//automatic login after registration
            res.status(201).json(token)

        } else {
            throw new Error("Unable to register such user! Please try again!");
        }

    } catch (error) {

        return res.status(401).json({ error: getErrorMessage(req.error || error) });
    };
});

router.post('/login', isGuest, async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await authService.login(email, password);
        const token = await authService.createToken(user);

        if (!token) {
            throw new Error("Unable to register such user! Please try again!");
        };

        res.cookie(SESSION_NAME, token, { httpOnly: true });
        res.status(200).json(token);

    } catch (error) {
        return res.send({ error: getErrorMessage(req.error || error) });
    };
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(SESSION_NAME);
    res.redirect('login');
});
module.exports = router;