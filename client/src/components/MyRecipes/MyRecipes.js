import { useEffect, useState } from "react";
import { endpoints } from "../../API/endpoints";
import { getOwn } from "../../services/mealService";
import { MealContainer } from "./MealContainer"

export const MyRecipes = ({ props }) => {

    const [meals, setMeals] = useState([]);

    useEffect(() => {
        getOwn(endpoints.API_MYRECIPES)
            .then(res => {
                console.log(res);
                setMeals(res);
            });
    }, []);


    return (
        <div className="search-container">
            <div>
                <h1 className="already-reg">Моите рецепти</h1>
                <form method="GET">
                    <input type="text" placeholder="Търси..." name="search" />
                    <input type="submit" value={'Търси'} />
                </form>
            </div>
            <div className="meal-containter">
                {meals.length > 0
                    ? meals.map(meal => <MealContainer key={meal._id} {...meal} />)
                    : <div className="already-reg">
                        <p>За сега няма намерени рецепти, добавете рецепта <a href="/recipe/add" className="already-reg">ТУК</a></p>
                    </div>
                }
            </div>
        </div>
    );
}