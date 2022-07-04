const router = require('express').Router();
const createRecipe = require('../services/foodService');
const { isAuth } = require('../middlewares/authMiddleware');

const { modelValidator } = require('../middlewares/modelValidatorMiddleware');
const { Meal } = require('../models/Meal');
const { getErrorMessage } = require('../utils/errorHelpers');

router.post('/add', modelValidator(Meal), async (req, res) => {

    const recipe = { ...req.body, owner: req.user._id };

    try {
        const created = await createRecipe.create(recipe);
        res.status(201).json(created);

    } catch (error) {
        res.status(404).json({ error: getErrorMessage(error.message) });
    }
});
module.exports = router;