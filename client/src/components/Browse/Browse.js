import { useContext, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import styles from "./Browse.module.css"

import { MealContainer } from "./MealContainer";
import { ScrollButton } from "../common/ScrollButton";

import { getAll } from "../../services/mealService";

import { LoggedUserContext } from "../../contexts/LoggedUserContext";
import { ErrorContext } from "../../contexts/ErrorMessageContext";

export const Browse = ({ isLoading, setIsLoading }) => {
    const navigate = useNavigate();

    const { user, userHandler } = useContext(LoggedUserContext);
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
            <div className={styles["search-container"]}>
                <title>Търсене на рецепти</title>

                {errorMessage !== ""
                    ?
                    !notDeleted?.length > 0
                        ?
                        ""
                        :
                        <>
                            <div className={styles["error-container"]}>
                                <p className={styles["error-message"]}>
                                    {errorMessage.error}
                                    <button className={styles["btn"]} onClick={() => [setErrorMessage(''), navigate('/')]}>
                                        OK
                                    </button>
                                </p>
                            </div>
                        </>
                    :
                    ""
                }
                <div>
                    <h1 className={styles["already-reg"]}>Търсене на рецепти</h1>
                    <form className={styles["search"]} method="GET">
                        {<input type="text" className={styles["recipe-browse"]} placeholder="Търси..." name="search"
                            defaultValue={filterValue} onChange={filterHandler} />}
                    </form>
                </div>
                {
                    <>
                        <p className={styles["arrow"]}>Резултатите от търсенето се отразяват на изобразяването на рецептите,
                            ако няма резултат, нищо няма да се изобрази.
                        </p>
                        <input type="button" className={styles["show-more-less"]}
                            value={toLoad ? "Покажи скорошни" : "Покажи всички"} onClick={toLoadHandler}
                        />
                        <h1 className={styles["already-reg"]}>
                            {
                                toLoad
                                    ?
                                    <p className={styles["arrow"]}>&#11167; Всички рецепти (scroll-нете надолу) &#11167;</p>
                                    :
                                    <p className={styles["arrow"]}>Най-скорокорошни рецепти</p>
                            }
                        </h1>
                    </>
                }
                {
                    < div className={styles["meal-containter"]}>
                        {
                            isLoading
                                ?
                                <div className={styles["already-reg"]}>
                                    <BeatLoader loading={isLoading} />
                                    <p>Рецептите се зареждат...</p>
                                </div>
                                :
                                filterValue
                                    ?
                                    filtered.length > 0
                                        ?
                                        filtered.map(meal =>
                                            <MealContainer key={meal._id} {...meal} timesLiked={meal.likes}
                                                setErrorMessage={setErrorMessage} errorMessage={errorMessage}
                                            />)
                                        :
                                        <p className={styles["arrow"]}>Няма намерени резултати</p>
                                    :
                                    notDeleted !== undefined && notDeleted !== null && notDeleted.length > 0
                                        ?
                                        recipesToShow.map(meal =>
                                            <MealContainer key={meal._id} {...meal} timesLiked={meal.likes}
                                                setErrorMessage={setErrorMessage} errorMessage={errorMessage}
                                            />)
                                        :
                                        <div className={styles["already-reg"]}>
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
            <ScrollButton />
        </>
    );
}