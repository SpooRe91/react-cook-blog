const router = require('express').Router();
const foodService = require('../services/foodService');
const { preloadMeal, isMealOwner } = require('../middlewares/mealMiddleware');
const { getErrorMessage } = require('../utils/errorHelpers');
const { isAuth } = require('../middlewares/authMiddleware');


router.get('/', async (req, res) => {

    res.status(200).json(`Welcome to the "Cook-Blog" API, please visit: http://localhost:3030/readme , to download the API documentation! `);
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
            let editResult = await foodService.edit(req.params.id, req.body);
            res.status(202).json(editResult);

        } catch (error) {
            console.error(error.message);
            res.status(400).json({ message: getErrorMessage(error) });
        }
    });

//----------------------------POST CREATE profile------------------------------------//
router.post('/profile-create', modelValidator(Profile), isAuth, async (req, res) => {

    const person = { ...req.body };

    try {
        const created = await createRecipe.createProfile(person);
        res.status(202).json(created);

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

//----------------------------PUT EDIT profile------------------------------------//
router.put('/profile-edit/:id', modelValidator(Profile), isAuth, async (req, res) => {

    const person = { ...req.body };

    try {
        const created = await createRecipe.createProfile(person, req.params.id);
        res.status(202).json(created);

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

//----------------------------POST DELETE------------------------------------//
router.delete('/delete/:id',
    isAuth,
    preloadMeal,
    isMealOwner,
    async (req, res) => {

        let meal = req.meal;
        try {
            const result = await foodService.delete(req.params.id);

            if (!result.acknowledged && result.modifiedCount === 0) {
                throw new Error(`Item ${meal._id} not found!`);
            }

            if (meal.isDeleted) {
                throw new Error(`This item is already deleted!`)
            }

            res.status(202).end();

        } catch (error) {
            console.error(error.message);
            res.status(404).json({ message: getErrorMessage(error) });
        }
    });

module.exports = router;