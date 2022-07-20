import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { getOwn } from "../../services/mealService";
import { MealContainer } from "./MealContainer"

export const MyRecipes = ({
    user, isLoading,
    setIsLoading, setErrorMessage,
    errorMessage }) => {

    const [meals, setMeals] = useState([]);

    useEffect(() => {
        getOwn()
            .then(res => {
                if (res.length > 0) {
                    setMeals(res);
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                }
            }).catch(error => {
                console.log(error.message);
                setErrorMessage({ error: error.message });
            })

    }, [setIsLoading, setErrorMessage]);

    const [filterValue, setFilterValue] = useState("");

    const filterHandler = (e) => {
        setFilterValue(e.target.value.toLowerCase());
    };

    const notDeleted = meals.filter(x => x.isDeleted !== true);

    return (
        <>
            <title>Моите рецепти</title>
            <div className="search-container">
                <div>
                    <h1 className="already-reg">Моите рецепти</h1>
                    <form className="search" method="GET">
                        <input type="text" className="recipe-browse" placeholder="Търси..." name="search"
                            value={filterValue} onChange={filterHandler} />
                    </form>
                </div>

                {
                    < div className="meal-containter">
                        {
                            isLoading
                                ?
                                <BeatLoader loading={isLoading} />
                                :
                                filterValue
                                    ?
                                    notDeleted.filter(x => x.name.toLowerCase().includes(filterValue))
                                        .map(meal =>
                                            <MealContainer key={meal._id} {...meal}
                                                timesLiked={meal.likes} user={user}
                                                setErrorMessage={setErrorMessage} errorMessage={errorMessage} />)
                                    :
                                    notDeleted !== undefined && notDeleted !== null && notDeleted.length > 0
                                        ?
                                        notDeleted.map(meal =>
                                            <MealContainer key={meal._id} {...meal}
                                                timesLiked={meal.likes} user={user}
                                                setErrorMessage={setErrorMessage} errorMessage={errorMessage} />)
                                        :
                                        <div className="already-reg">
                                            <p>За сега няма намерени рецепти, добавете рецепта <Link to="/recipe/add" className="already-reg">ТУК</Link></p>
                                        </div>
                        }
                    </div>
                }

                {errorMessage && <p className="error-message"> {errorMessage.error}</p>}
            </div >
        </>
    );
}