import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MyRecipes.module.css";
import { ScrollButton } from "../common/ScrollButton";
import { MealContainer } from "./MealContainer";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";
import { ErrorContext } from "../../contexts/ErrorMessageContext";
import { useOwnMeals } from "../../hooks/useOwnMeals";
import LoadingComponent from "../common/LoadingComponent";
export const MyRecipes = () => {
    const navigate = useNavigate();

    const { user } = useContext(LoggedUserContext);
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);
    const [filterValue, setFilterValue] = useState("");

    const { notDeleted, isLoading } = useOwnMeals();

    const filterHandler = (e) => {
        setFilterValue(e.target.value.toLowerCase());
    };

    return (
        <>
            <title>Моите рецепти</title>
            {errorMessage && (
                <div className={styles["error-container"]}>
                    <p className={styles["error-message"]}>
                        {errorMessage}
                        <button
                            className={styles["btn"]}
                            onClick={() => [setErrorMessage(""), navigate("/", { replace: true })]}
                        >
                            OK
                        </button>
                    </p>
                </div>
            )}
            <div className={styles["search-container"]}>
                <div>
                    <h1 className={styles["already-reg"]}>Моите рецепти</h1>
                    {!isLoading && !!notDeleted.length && (
                        <form className={styles["search"]} method="GET">
                            <input
                                type="text"
                                className={styles["recipe-browse"]}
                                placeholder="Търси..."
                                name="search"
                                value={filterValue}
                                onChange={filterHandler}
                            />
                        </form>
                    )}
                </div>
            </div>

            {!isLoading && !notDeleted.length && (
                <div className={styles["already-reg"]}>
                    <p>
                        За сега няма намерени рецепти, добавете рецепта{" "}
                        <Link to="/recipe/add" className={styles["btn"]}>
                            ТУК
                        </Link>
                    </p>
                </div>
            )}

            {isLoading && <LoadingComponent {...{ isLoading }} />}
            {
                <div className={styles["meal-containter"]}>
                    {filterValue &&
                        notDeleted &&
                        notDeleted
                            .filter((x) => x.name.toLowerCase().includes(filterValue))
                            .map((meal) => (
                                <MealContainer
                                    key={meal._id}
                                    {...meal}
                                    timesLiked={meal.likes}
                                    user={user}
                                    setErrorMessage={setErrorMessage}
                                    errorMessage={errorMessage}
                                />
                            ))}
                    {notDeleted &&
                        notDeleted?.map((meal) => (
                            <MealContainer
                                key={meal._id}
                                {...meal}
                                timesLiked={meal.likes}
                                user={user}
                                setErrorMessage={setErrorMessage}
                                errorMessage={errorMessage}
                            />
                        ))}
                </div>
            }
            <ScrollButton />
        </>
    );
};
