import { useEffect, useState } from "react";
import { MealContainer } from "./MealContainer"

export const MyRecipes = () => {

    const [meals, setMeal] = useState([]);
    const API_URL = "http://localhost:3030/";

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setMeal(data);
            })
            .catch(err => {
                throw err.message
            })
    }, []);

    const mealsRender = meals.map(meal => <MealContainer key={meal._id} {...meal} />);

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
                {meals.length > 0
                    ? mealsRender
                    : <div className="already-reg">
                        <p>За сега няма намерени рецепти, добавете рецепта <a href="/recipe/add" className="already-reg">ТУК</a></p>
                    </div>
                }
            </div>
        </>
    );
}