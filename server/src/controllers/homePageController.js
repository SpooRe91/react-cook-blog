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
//----------------------------GET LIKES------------------------------------//

router.get('/like/:id', preloadMeal, async (req, res) => {

    const meal = req.meal;

    if (!meal.likes.find(x => x === req.user._id)) {
        try {
            await foodService.addLike(meal._id, req.user._id);
            res.status(202).json({ messag: "Added a like!" }).end();
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: getErrorMessage(error) });
        }
    } else {
        res.status(400).json({ message: "You have already liked this!" });
    }
});

//----------------------------POST EDIT------------------------------------//
router.put('/edit/:id',
    preloadMeal,
    isMealOwner,
    async (req, res) => {

        try {
            await foodService.edit(req.params.id, req.body);

            res.status(202).end();

        } catch (error) {
            console.error(error.message);
            res.status(400).json({ message: getErrorMessage(error) });
        }
    });

//----------------------------POST DELETE------------------------------------//
router.delete('/delete/:id',
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