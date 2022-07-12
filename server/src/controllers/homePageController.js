const router = require('express').Router();
const foodService = require('../services/foodService');
const { preloadMeal, isMealOwner } = require('../middlewares/mealMiddleware');
const { getErrorMessage } = require('../utils/errorHelpers');
const { isAuth } = require('../middlewares/authMiddleware');


router.get('/', async (req, res) => {

    const data = await foodService.getAll();
    res.json(data);
})

//----------------------------GET DETAILS------------------------------------//
router.get('/details/:id',
    preloadMeal,
    (req, res) => {
        const meal = req.meal;
        res.json(meal);
    });

//----------------------------POST EDIT------------------------------------//
router.put('/edit/:id',
    preloadMeal,
    isMealOwner,
    async (req, res) => {

        try {
            let result = await foodService.edit(req.params.id, req.body);

            if (!result) {
                throw new Error('Unable to edit the given resource!')
            }
            res.json(result);

        } catch (error) {
            console.error(error.message);
            res.status(400).json({ message: getErrorMessage(error) });
        }
    });

//----------------------------POST DELETE------------------------------------//
router.delete('/:id',
    isAuth,
    preloadMeal,
    isMealOwner,
    async (req, res) => {

        try {
            let meal = req.meal;
            const result = await foodService.delete(meal._id);
            if (!result) {
                throw new Error(`Item ${meal._id} not found!`)
            }

            res.json(result)

        } catch (error) {
            console.error(error.message);
            res.status(404).json({ message: getErrorMessage(error) });
        }
    });

module.exports = router;