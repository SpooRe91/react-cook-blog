import { useEffect, useState } from "react";
import { endpoints } from "../../API/endpoints";
import { getAll } from "../../services/mealService";
import { Meal } from "./Meal"

export const Browse = () => {

    const [meals, setMeals] = useState([]);

    useEffect(() => {
        getAll(endpoints.API_BROWSE)
            .then(res => {
                console.log(res);
                setMeals(res)
            })
    }, []);

    return (
        <div className="search-container">
            <form method="GET">
                <input type="text" placeholder="Търси..." name="search" />
                <input type="submit" value={"Търси"} />
            </form>

            <div className="meal-containter">
                {meals !== undefined && meals !== null && meals.length > 0
                    ? meals.map(meal => <Meal key={meal._id} {...meal} />)
                    : <div className="already-reg">
                        <p>Все още няма рецепти!</p>
                    </div>
                }
            </div>
        </div>
    );
}