import { useEffect, useState } from "react";
import { getAll } from "../../services/mealService";
import { MealContainer } from "../MyRecipes/MealContainer";
import { BeatLoader } from "react-spinners";
export const Browse = ({ isLoading, setIsLoading, setErrorMessage, errorMessage }) => {

    const [meals, setMeals] = useState([]);

    useEffect(() => {
        async function getBrosweItems() {

            const res = await getAll();
            if (res.length > 0) {
                setMeals(res);
                setIsLoading(false);
            } else if (res.message) {
                console.log(res.message);
                setErrorMessage({ error: res.message });
                throw new Error(res.message);
            }
        }
        getBrosweItems();
    }, []);

    return (
        <div className="search-container">
            <div>
                {errorMessage
                    ? <p className="error-message"> {errorMessage.error}</p>
                    : ""
                }
                <h1 className="already-reg">Търсене на рецепти</h1>
                <form className="search" method="GET">
                    <input type="text" placeholder="Търси..." name="search" />
                    <input type="submit" value={"Търси"} />
                </form>
            </div>
            {
                isLoading
                    ? <BeatLoader loading={isLoading} />
                    : <div className="meal-containter">
                        {meals !== undefined && meals !== null && meals.length > 0
                            ? meals.map(meal => <MealContainer key={meal._id} {...meal} />)
                            : <div className="already-reg">
                                <p>Все още няма рецепти!</p>
                            </div>
                        }
                    </div>
            }
        </div>
    );
}