const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const foodService = require('../services/foodService');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/browse', async (req, res) => {

    try {
        let allMeals = await foodService.getAll(req.query.search);

        if (allMeals.length <= 0) {
            throw new Error("Не можахме да намерим рецепти или сървърът не отговаря!");
        }

        res.status(200).json(allMeals);
    } catch (error) {

        res.status(400).json({ message: getErrorMessage(error) });
    }

});

router.get('/myRecipes', isAuth, async (req, res) => {


    try {
        let allMeals = await foodService.getOwn(req.user._id);

        if (!allMeals.length > 0) {
            throw new Error("Няма намерени рецепти!");
        }
        res.status(200).json(allMeals);

    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.get('/macros', async (req, res) => {

    try {
        let allMeals = await foodService.getNutritions();

        if (allMeals.length <= 0) {
            throw new Error("Ресурсите не могат да бъдат намерени!");
        };
        res.status(200).json(allMeals);
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }

});

module.exports = router;