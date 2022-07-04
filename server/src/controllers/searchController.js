const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const foodService = require('../services/foodService');

router.get('/browse', async (req, res) => {

    try {
        let allMeals = await foodService.getAll(req.query.search);

        if (allMeals.length !== 0) {
            res.render('browse', { allMeals });

        } else if (allMeals.length == 0) {
            allMeals = false;
            res.render('browse', { allMeals });

        } else {
            throw {
                message: "Unable to fetch any recipes!"
            }
        }
    } catch (error) {
        res.render('404', { error: error.message });
    }

});


router.get('/myRecipes', isAuth, async (req, res) => {

    try {
        let allMeals = await foodService.getOwn(req.user._id);

        if (allMeals.length !== 0) {
            res.render('myRecipes', { allMeals });

        } else if (allMeals.length == 0) {
            allMeals = false;
            res.render('myRecipes', { allMeals });
            
        } else {
            throw {
                message: "Unable to fetch your recipes!"
            }
        }
    } catch (error) {
        res.render('404', { error: error.message });
    }

});

module.exports = router;