import { useEffect, useState } from "react";
import { getAll } from "../../services/mealService";
import { MealContainer } from "./MealContainer";
import { BeatLoader } from "react-spinners";
export const Browse = ({ user, isLoading, setIsLoading, setErrorMessage, errorMessage }) => {

    const [meals, setMeals] = useState([]);

    useEffect(() => {
        getAll()
            .then(res => {
                if (res.length > 0) {
                    setMeals(res);
                    setIsLoading(false);
                }
            }).catch(error => {
                console.log(error.message);
                setErrorMessage({ error: error.message });
            });
    }, [setErrorMessage]);

    const [filterValue, setFilterValue] = useState("");

    const filterHandler = (e) => {
        setFilterValue(e.target.value.toLowerCase());
    };

    const notDeleted = meals.filter(x => x.isDeleted !== true);
    return (

        <div className="search-container">
            <title>Търсене на рецепти</title>
            <div>
                <h1 className="already-reg">Търсене на рецепти</h1>
                <form className="search" method="GET">
                    <input type="text" placeholder="Търси..." name="search"
                        value={filterValue} onChange={filterHandler} />
                </form>
            </div>
            {
                < div className="meal-containter">
                    {
                        isLoading
                            ? <BeatLoader loading={isLoading} />
                            : filterValue
                                ? notDeleted.filter(x => x.name.toLowerCase().includes(filterValue))
                                    .map(meal =>
                                        <MealContainer key={meal._id} {...meal}
                                            user={user} timesLiked={meal.likes}
                                            setErrorMessage={setErrorMessage} errorMessage={errorMessage} />)
                                :
                                notDeleted !== undefined && notDeleted !== null && notDeleted.length > 0
                                    ? notDeleted.map(meal =>
                                        <MealContainer key={meal._id} {...meal}
                                            user={user} timesLiked={meal.likes}
                                            setErrorMessage={setErrorMessage} errorMessage={errorMessage} />)

                                    : <div className="already-reg">
                                        <p>Все още няма рецепти!</p>
                                    </div>
                    }
                </div>
            }
            {errorMessage
                ? <p className="error-message"> {errorMessage.error}</p>
                : ""
            }
        </div >

    );
}