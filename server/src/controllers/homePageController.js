const router = require('express').Router();
const foodService = require('../services/foodService');
const { preloadMeal, isMealOwner } = require('../middlewares/mealMiddleware');
const { getErrorMessage } = require('../utils/errorHelpers');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {

    res.status(200).json(`Добре дошли в "Cook-Blog" API, моля посетете този линк, за README файл
    : https://github.com/SpooRe91/react-js-project-final/blob/main/Cook-Blog-readme.md , to download the API documentation! `);
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
            res.status(202).json({ messag: "Добавено харесване!" }).end();
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: getErrorMessage(error) });
        }
    } else {
        res.status(400).json({ message: "Вече сте харесали това!" });
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

//----------------------------GET USER profile------------------------------------//
router.get('/user-get/:id', isAuth, async (req, res) => {

    try {

        const user = await foodService.getUser(req.params.id);

        if (user) {
            res.status(200).json(user);
        } else {
            throw new Error("Няма такъв потребител!")
        }

    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: getErrorMessage(error) });
    }


});

//----------------------------PUT EDIT profile-image------------------------------------//

router.put('/user-edit/:id', isAuth, async (req, res) => {

    const image = { ...req.body }

    try {
        const edited = await foodService.editUserImage(image.image, req.params.id);
        res.status(202).json(edited);

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
                throw new Error(`Елемент с ID: ${meal._id} не е намерен!`);
            }

            if (meal.isDeleted) {
                throw new Error(`Този елемент вече е изтрит!`)
            }

            res.status(202).end();

        } catch (error) {
            console.error(error.message);
            res.status(404).json({ message: getErrorMessage(error) });
        }
    });

module.exports = router;