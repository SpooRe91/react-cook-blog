const mealService = require('../services/foodService');
const mongoose = require('mongoose');
const { getErrorMessage } = require('../utils/errorHelpers');

exports.preloadMeal = async (req, res, next) => {

    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw new Error("Такъв ресурс, не е намерен!");
        }
        const meal = await mealService.getOne(req.params.id).lean();

        if (!meal) {
            throw new Error("Такъв ресурс, не е намерен!");
        };

        req.meal = meal;
        next();

    } catch (error) {
        res.status(404).json({ message: getErrorMessage(error) });
    }
};

exports.isMealOwner = (req, res, next) => {

    if (req.meal.owner != req.user._id) {
        return next({ message: 'Нямате нужните права!', status: 401 })
    }

    next();
};