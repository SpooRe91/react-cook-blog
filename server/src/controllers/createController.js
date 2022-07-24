const router = require('express').Router();
const createRecipe = require('../services/foodService');
const { isAuth } = require('../middlewares/authMiddleware');

const { modelValidator } = require('../middlewares/modelValidatorMiddleware');
const { Meal } = require('../models/Meal');
const { getErrorMessage } = require('../utils/errorHelpers');

router.post('/add', modelValidator(Meal), isAuth, async (req, res) => {

    const recipe = { ...req.body, owner: req.user._id, ownerName: req.user.email };

    try {
        const created = await createRecipe.createMeal(recipe);
        res.status(202).json(created);

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: getErrorMessage(error) });
    }
});
module.exports = router;