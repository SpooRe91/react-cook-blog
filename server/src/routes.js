const express = require('express');
const router = express.Router();

const homePageController = require('./controllers/homePageController');
const searchController = require('./controllers/searchController');
const createController = require('./controllers/createController');
const authController = require('./controllers/authController');


router.use(homePageController);
router.use('/auth', authController);
router.use('/recipe', searchController, createController);
router.get('*', (req, res) => {
    res.render('404')
});

module.exports = router;