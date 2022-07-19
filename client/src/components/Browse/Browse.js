import { useEffect, useState } from "react";
import { getAll } from "../../services/mealService";
import { MealContainer } from "./MealContainer";
import { BeatLoader } from "react-spinners";
export const Browse = ({ user, isLoading, setIsLoading, setErrorMessage, errorMessage }) => {


    const [notDeleted, setnotDeleted] = useState([]);
    const [moreRecipesToLoad, setMoreRecipesToLoad] = useState([]);
    const [toLoad, setToLoad] = useState(false);

    useEffect(() => {
        getAll()
            .then(res => {
                if (res.length > 0) {
                    setnotDeleted(res.filter(x => x.isDeleted !== true));
                    setMoreRecipesToLoad(notDeleted.slice(0, notDeleted.length - 4));
                    setIsLoading(false);
                }
            }).catch(error => {
                console.log(error.message);
                setErrorMessage({ error: error.message });
            });
    }, [setIsLoading, setErrorMessage, setMoreRecipesToLoad]);

    const [filterValue, setFilterValue] = useState("");

    const filterHandler = (e) => {
        setFilterValue(e.target.value.toLowerCase());
    };

    const recipesToShow = notDeleted.slice(notDeleted.length - 4);


    const toLoadHandler = () => {
        setMoreRecipesToLoad(notDeleted.slice(0, notDeleted.length - 4));
        setToLoad(state => !state);
    }

    return (

        <div className="search-container">
            <title>Търсене на рецепти</title>
            <div>
                <h1 className="already-reg">Търсене на рецепти</h1>
                <form className="search" method="GET">
                    {<input type="text" className="recipe-browse" placeholder="Търси..." name="search"
                        value={filterValue} onChange={filterHandler} />}
                </form>
            </div>
            {
                <>
                    < input type="button" defaultValue={toLoad ? "Покажи скорошни" : "Покажи всички"} onClick={toLoadHandler} />
                    <p className="arrow">Резултатите от търсенето се отразяват на изобразяването на рецептите, ако няма резултат, нищо няма да се изобрази.</p>
                    <h1 className="already-reg">{toLoad ?
                        <p className="arrow">&#11167; Всички рецепти(scroll-нете надолу) &#11167;</p>
                        : <p className="arrow">Най-скорокорошни рецепти</p>}</h1>

                </>
            }
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
                                    ?
                                    recipesToShow.map(meal =>
                                        <MealContainer key={meal._id} {...meal}
                                            user={user} timesLiked={meal.likes}
                                            setErrorMessage={setErrorMessage} errorMessage={errorMessage} />)
                                    : <div className="already-reg">
                                        <p>Все още няма рецепти!</p>
                                    </div>
                    }
                    {
                        toLoad && !filterValue
                            ?
                            moreRecipesToLoad.map(meal => <MealContainer key={meal._id} {...meal}
                                user={user} timesLiked={meal.likes}
                                setErrorMessage={setErrorMessage} errorMessage={errorMessage} />)
                            : ""
                    }

                </div>

            }
            {
                errorMessage
                    ? <p className="error-message"> {errorMessage.error}</p>
                    : ""
            }
        </div >

    );
}