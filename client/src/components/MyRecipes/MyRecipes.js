import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import styles from "./MyRecipes.module.css";

import { getOwn } from "../../services/mealService";

import { ScrollButton } from "../common/ScrollButton";
import { MealContainer } from "./MealContainer"

import { LoggedUserContext } from "../../contexts/LoggedUserContext";
import { ErrorContext } from "../../contexts/ErrorMessageContext";

export const MyRecipes = ({ isLoading, setIsLoading }) => {
    const navigate = useNavigate();

    const {...props} = useContext(LoggedUserContext);
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);

    const [filterValue, setFilterValue] = useState("");
    const [notDeleted, setNotDeleted] = useState([])

    useEffect(() => {
        if (!props.user) {
            setErrorMessage('Моля, първо влезте!');
            navigate('/404');
        };
    });


    useEffect(() => {
        getOwn()
            .then(res => {
                if (res.length > 0) {
                    setNotDeleted(state => res.filter(x => x.isDeleted !== true));
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                }
                if (res.message) throw new Error(res.message);
            }).catch(error => {
                console.log(error.message);
                setErrorMessage({ error: error.message });
            });
        return () => {
            setErrorMessage('');
        }
    }, [setIsLoading, setErrorMessage]);


    const filterHandler = (e) => {
        setFilterValue(e.target.value.toLowerCase());
    };

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
                                    <BeatLoader loading={() => isLoading} color={"white"}/>
                                    <p>Вашите рецепти се зареждат... <Link to="/recipe/add" className={styles["already-reg"]}>ТУК</Link></p>
                                </div>
                                :
                                filterValue
                                    ?
                                    notDeleted.filter(x => x.name.toLowerCase().includes(filterValue))
                                        .map(meal =>
                                            <MealContainer key={meal._id} {...meal}
                                                timesLiked={meal.likes} user={props.user}
                                                setErrorMessage={setErrorMessage} errorMessage={errorMessage} />)
                                    :
                                    notDeleted !== undefined && notDeleted !== null && notDeleted?.length > 0
                                        ?
                                        notDeleted.map(meal =>
                                            <MealContainer key={meal._id} {...meal}
                                                timesLiked={meal.likes} user={props.user}
                                                setErrorMessage={setErrorMessage} errorMessage={errorMessage} />)
                                        :
                                        <div className={styles["already-reg"]}>
                                            <p>За сега няма намерени рецепти, добавете рецепта <Link to="/recipe/add" className={styles["already-reg"]}>ТУК</Link></p>
                                        </div>
                        }
                    </div>
                }
            </div >
            <ScrollButton />
        </>
    );
}