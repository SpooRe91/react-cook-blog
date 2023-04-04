import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
import styles from "./MyRecipes.module.css";
import { ScrollButton } from "../common/ScrollButton";
import { MealContainer } from "./MealContainer"
//-------------------------------------------------------------------------------------------------
import { LoggedUserContext } from "../../contexts/LoggedUserContext";
import { ErrorContext } from "../../contexts/ErrorMessageContext";
import { useOwnMeals } from "../../customHooks/useOwnMeals";
//-------------------------------------------------------------------------------------------------
export const MyRecipes = ({ isLoading, setIsLoading }) => {
    const navigate = useNavigate();

    const { user } = useContext(LoggedUserContext);
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);
    //-------------------------------------------------------------------------------------------------
    const [filterValue, setFilterValue] = useState("");
    const [notDeleted, setNotDeleted] = useState([])
    //-------------------------------------------------------------------------------------------------

    const { getAllOwnMeals, loading } = useOwnMeals();
    const controller = new AbortController();
    const { signal } = controller;

    useEffect(() => {
        setIsLoading(state => true);

        getAllOwnMeals(signal, controller)
            .then((res) => {
                if (res.length > 0) {
                    setNotDeleted(res.filter(x => x.isDeleted !== true));
                    setIsLoading(state => loading);
                }
            })
            .catch(error => {
                if (controller.signal.aborted) { return }
                console.log(error.message);
                setErrorMessage(error.message);
            })
        return () => {
            setErrorMessage('');
            controller.abort();
        }
    }, [loading, setIsLoading, setErrorMessage]);


    //-------------------------------------------------------------------------------------------------
    const filterHandler = (e) => {
        setFilterValue(e.target.value.toLowerCase());
    };

    //-------------------------------------------------------------------------------------------------
    return (
        <>
            <title>Моите рецепти</title>
            {errorMessage !== ""
                ?
                !notDeleted?.length > 0
                    ?
                    ""
                    :
                    <>
                        <div className={styles["error-container"]}>
                            <p className={styles["error-message"]}>
                                {errorMessage}
                                <button className={styles["btn"]} onClick={() => [setErrorMessage(''), navigate('/', { replace: true })]}>
                                    OK
                                </button>
                            </p>
                        </div>
                    </>
                :
                ""
            }
            <div className={styles["search-container"]}>
                <div>
                    <h1 className={styles["already-reg"]}>Моите рецепти</h1>
                    <form className={styles["search"]} method="GET">
                        <input type="text" className={styles["recipe-browse"]} placeholder="Търси..." name="search"
                            value={filterValue} onChange={filterHandler} />
                    </form>
                </div>
                {
                    < div className={styles["meal-containter"]}>
                        {
                            isLoading
                                ?
                                <div className={styles["already-reg"]}>
                                    <BeatLoader loading={() => isLoading} color={"white"} />
                                    <p>Вашите рецепти се зареждат... </p>
                                </div>
                                :
                                filterValue
                                    ?
                                    notDeleted.filter(x => x.name.toLowerCase().includes(filterValue))
                                        .map(meal =>
                                            <MealContainer key={meal._id} {...meal}
                                                timesLiked={meal.likes} user={user}
                                                setErrorMessage={setErrorMessage} errorMessage={errorMessage} />)
                                    :
                                    notDeleted !== undefined && notDeleted !== null && notDeleted?.length > 0
                                        ?
                                        notDeleted.map(meal =>
                                            <MealContainer key={meal._id} {...meal}
                                                timesLiked={meal.likes} user={user}
                                                setErrorMessage={setErrorMessage} errorMessage={errorMessage} />)
                                        :
                                        <div className={styles["already-reg"]}>
                                            <p>За сега няма намерени рецепти, добавете рецепта <Link to="/recipe/add" className={styles["btn"]}>ТУК</Link></p>
                                        </div>
                        }
                    </div>
                }
            </div >
            <ScrollButton />
        </>
    );
}