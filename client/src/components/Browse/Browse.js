import { useContext, useEffect, useState } from "react";
import { MealContainer } from "./MealContainer";
import { ScrollButton } from "./ScrollButton";

import { getAll } from "../../services/mealService";
import { BeatLoader } from "react-spinners";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";
import { ErrorContext } from "../../contexts/ErrorMessageContext";
import { useNavigate } from "react-router-dom";

export const Browse = ({ isLoading, setIsLoading }) => {
    const navigate = useNavigate();
    const user = useContext(LoggedUserContext);
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);

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
        setMoreRecipesToLoad(state =>
            [...state, ...(notDeleted?.slice(0, notDeleted.length - 4))]);
        setRecipesToShow(state =>
            [...state, ...(notDeleted.slice(notDeleted.length - 4))]);
        setIsLoading(false);
    }, [notDeleted, setIsLoading]);


    const filtered = notDeleted.filter(x => x.name.toLowerCase().includes(filterValue));


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
                
                {errorMessage !== "" &&
                    <div className="error-container">
                        <p className="error-message">
                            {errorMessage.error}
                            <button className="btn" onClick={() => [setErrorMessage(''), navigate('/')]}>
                                OK
                            </button>
                        </p>
                    </div>
                }
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
                        <input type="button" className="show-more-less"
                            defaultValue={toLoad ? "Покажи скорошни" : "Покажи всички"} onClick={toLoadHandler}
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
                                <div className="already-reg">
                                    <BeatLoader loading={isLoading} />
                                    <p>Рецептите се зареждат...</p>
                                </div>
                                :
                                filterValue
                                    ?
                                    filtered.length > 0
                                        ?
                                        filtered.map(meal =>
                                            <MealContainer key={meal._id} {...meal}
                                                user={user} timesLiked={meal.likes}
                                                setErrorMessage={setErrorMessage} errorMessage={errorMessage}
                                            />)
                                        :
                                        <p className="arrow">Няма намерени резултати</p>
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
            </div>
            {<ScrollButton />}
        </>
    );
}