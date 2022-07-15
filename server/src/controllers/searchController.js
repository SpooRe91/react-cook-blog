const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const foodService = require('../services/foodService');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/browse', async (req, res) => {

    try {
        let allMeals = await foodService.getAll(req.query.search);

        if (allMeals.length <= 0) {
            throw new Error("Unable to fetch any recipes or there aren't any!");
        }

        res.json(allMeals);
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }

});

router.get('/myRecipes', isAuth, async (req, res) => {

    try {
        let allMeals = await foodService.getOwn(req.user._id);

        if (allMeals.length <= 0) {
            throw new Error("Unable to fetch any recipes or there aren't any!");
        }
        res.json(allMeals);

    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.get('/macros', async (req, res) => {

    try {
        let allMeals = await foodService.getNutritions(req.query.search);

        if (allMeals.length <= 0) {
            throw new Error("The resource cold not be found!");
        };
        res.json(allMeals);
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }

});

module.exports = router;