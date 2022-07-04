const router = require('express').Router();
const foodService = require('../services/foodService');
const { preloadMeal, isMealOwner } = require('../middlewares/mealMiddleware');
const { getErrorMessage } = require('../utils/errorHelpers');

//----------------------------GET DETAILS------------------------------------//
router.get('/details/:id',
    preloadMeal,
    async (req, res) => {
        const meal = req.meal;

        if (meal) {
            return res.status(200).json(meal);
        }

        res.status(404).json({ error: getErrorMessage(req.error || error) });
    });

//----------------------------GET EDIT------------------------------------//
router.get('/edit/:id',
    preloadMeal,
    async (req, res) => {
        try {
            res.json(req.meal);
        } catch (error) {
            res.status(404).json({ error: getErrorMessage(error.message) });
        }
    });
//----------------------------POST EDIT------------------------------------//
router.put('/edit/:id',
    preloadMeal,
    isMealOwner,
    async (req, res) => {

        try {
            await foodService.edit(req.params.id, req.body);
            res.status(202).json(req.meal);

        } catch (error) {
            res.status(404).json({ error: getErrorMessage(error.message) });
        }
    });

//----------------------------GET DELETE------------------------------------//
router.get('/delete/:id',
    preloadMeal,
    isMealOwner,
    async (req, res) => {

        try {
            let meal = req.meal;
            res.render('delete', { meal });

        } catch (error) {
            res.render('edit', { ...req.body, error: getErrorMessage(error) });
        }
    });

//----------------------------POST DELETE------------------------------------//
router.post('/delete/:id',
    preloadMeal,
    isMealOwner,
    async (req, res) => {

        let confirm = req.body.confirm;

        try {
            let meal = req.meal;

            if (confirm) {
                await foodService.delete(meal._id);
                return res.redirect('/recipe/myRecipes');
            };
            res.redirect(`/details/${meal._id}`);

        } catch (error) {
            res.render('details', { ...req.body, error: getErrorMessage(error) });
        }
    });

module.exports = router;