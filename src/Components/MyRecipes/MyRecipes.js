import { useState } from "react";
import { MealContainer } from "./MealContainer"

export const MyRecipes = (props) => {

    let myMeals = useState(props.meals);
    let [myRecipes, setMeals] = myMeals;

    myRecipes = [{
        name: "Mandja",
        image: "https://images.everydayhealth.com/images/healthy-meal-tips-for-type-2-diabetes-00-722x406.jpg",
        fullRecipe: "This is the full recipe",
        ingredients: "These are the ingredients",
        owner: true,
        _id: '1234567890'
    }, {
        name: "Mandja",
        image: "https://images.everydayhealth.com/images/healthy-meal-tips-for-type-2-diabetes-00-722x406.jpg",
        fullRecipe: "This is the full recipe",
        ingredients: "These are the ingredients",
        owner: true,
        _id: '123456783290'
    }];

    return (
        <>
            <div className="search-container">
                <h1 className="already-reg">Моите рецепти</h1>
                <form method="GET">
                    <input type="text" placeholder="Търси..." name="search" />
                    <button type="submit">Търси</button>
                </form>
            </div>
            <div className="meal-containter">
                {myRecipes.length > 0
                    ? myRecipes.map((el, i) => <MealContainer key={el._id} meal={el} />)
                    : <div className="already-reg">
                        <p>За сега няма намерени рецепти, добавете рецепта <a href="/recipe/add" className="already-reg">ТУК</a></p>
                    </div>
                }
            </div>
        </>
    );
}