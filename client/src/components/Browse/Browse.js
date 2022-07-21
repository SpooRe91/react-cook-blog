import { useEffect, useState } from "react";
import { MealContainer } from "./MealContainer";
import { ScrollButton } from "./ScrollButton";

import { getAll } from "../../services/mealService";
import { BeatLoader } from "react-spinners";

export const Browse = ({ user, isLoading, setIsLoading, setErrorMessage, errorMessage }) => {

    const [notDeleted, setnotDeleted] = useState([]);

    const [moreRecipesToLoad, setMoreRecipesToLoad] = useState([]);
    const [recipesToShow, setRecipesToShow] = useState([]);

    const [toLoad, setToLoad] = useState(false);
    const [filterValue, setFilterValue] = useState("");

    useEffect(() => {
        getAll()
            .then(res => {
                if (res.length > 0) {
                    setnotDeleted(res.filter(x => x.isDeleted !== true));
                    setIsLoading(state => !state);
                }
                if (res.message) throw new Error(res.message);
            })
            .catch(error => {
                console.log(error.message);
                setErrorMessage({ error: error.message });
            });
        return () => {
            setErrorMessage('');
        }
    }, [setnotDeleted, setIsLoading, setErrorMessage]);


    useEffect(() => {
        setMoreRecipesToLoad(state => [...state, ...(notDeleted?.slice(0, notDeleted.length - 4))]);
        setRecipesToShow(state => [...state, ...(notDeleted.slice(notDeleted.length - 4))]);
        setIsLoading(false);
    }, [notDeleted, setIsLoading]);


    const filterHandler = (e) => {
        setFilterValue(e.target.value.toLowerCase());
    };


    const toLoadHandler = () => {
        setToLoad(state => !state);
    };

    return (
        <>
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
                        <p className="arrow">Резултатите от търсенето се отразяват на изобразяването на рецептите,
                            ако няма резултат, нищо няма да се изобрази.
                        </p>
                        < input type="button" defaultValue={toLoad ? "Покажи скорошни" : "Покажи всички"} onClick={toLoadHandler}
                        />
                        <h1 className="already-reg">
                            {
                                toLoad
                                    ?
                                    <p className="arrow">&#11167; Всички рецепти (scroll-нете надолу) &#11167;</p>
                                    :
                                    <p className="arrow">Най-скорокорошни рецепти</p>
                            }
                        </h1>
                    </>
                }
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
                                                user={user} timesLiked={meal.likes}
                                                setErrorMessage={setErrorMessage} errorMessage={errorMessage}
                                            />)
                                    :
                                    notDeleted !== undefined && notDeleted !== null && notDeleted.length > 0
                                        ?
                                        recipesToShow.map(meal =>
                                            <MealContainer key={meal._id} {...meal}
                                                user={user} timesLiked={meal.likes}
                                                setErrorMessage={setErrorMessage} errorMessage={errorMessage}
                                            />)
                                        :
                                        <div className="already-reg">
                                            <p>Все още няма рецепти!</p>
                                        </div>
                        }
                        {
                            (toLoad && !filterValue)
                            &&
                            moreRecipesToLoad.map(meal => <MealContainer key={meal._id} {...meal}
                                user={user} timesLiked={meal.likes}
                                setErrorMessage={setErrorMessage} errorMessage={errorMessage} />)
                        }
                    </div>
                }
                {errorMessage && <p className="error-message"> {errorMessage.error}</p>}
            </div>
            {<ScrollButton />}
        </>
    );
}