import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./Profile.module.css";

import { ErrorContext } from "../../contexts/ErrorMessageContext";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";

import { MealContainer } from "../MyRecipes/MealContainer";

import LoadingComponent from "../common/LoadingComponent";
import { useProfile } from "../../hooks/useMyProfile";
import { useOwnMeals } from "../../hooks/useOwnMeals";
import { ScrollButton } from "../common/ScrollButton";

export const Profile = ({ setIsLoading }) => {
    const { user } = useContext(LoggedUserContext);
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);
    const { id } = useParams();
    const [userProfile, setUserProfile] = useState(null);

    const controller = new AbortController();

    const { getUserProfile, loading } = useProfile(id);
    const { notDeleted, isLoading } = useOwnMeals();

    useEffect(() => {
        setIsLoading((state) => true);

        getUserProfile()
            .then((res) => {
                setUserProfile(res);
                setIsLoading((state) => loading);
            })
            .catch((error) => {
                if (controller.signal.aborted) {
                    return;
                }
                console.log(error.message);
                setErrorMessage(error.message);
            });
        return () => {
            setIsLoading((state) => false);
            setErrorMessage("");
            controller.abort();
        };
    }, [loading, setErrorMessage, setIsLoading]);

    return (
        <>
            <title>Profile</title>

            <div className={styles["profile"]}>
                {isLoading && <LoadingComponent {...{ isLoading }} />}
                {!isLoading && (
                    <div>
                        <article>
                            <p className={styles["recipe-diff-count"]} style={{ color: "wheat" }}>
                                <strong>вашият email: </strong>
                                <span style={{ color: "white" }}>{userProfile?.email}</span>
                            </p>

                            <p className={styles["recipe-diff-count"]} style={{ color: "wheat" }}>
                                <strong>вашите публикации:</strong>
                            </p>
                            <div className={styles["profile-publications-container"]}>
                                {notDeleted?.length ? (
                                    notDeleted.map((meal) => (
                                        <MealContainer
                                            key={meal._id}
                                            {...meal}
                                            timesLiked={meal.likes}
                                            user={user}
                                            setErrorMessage={setErrorMessage}
                                            errorMessage={errorMessage}
                                        />
                                    ))
                                ) : (
                                    <div>
                                        <p className={styles["recipe-diff-count"]} style={{ color: "red" }}>
                                            <strong>Все още нямате публикации!</strong>
                                        </p>
                                        <p className={styles["recipe-diff-count"]}>
                                            {" "}
                                            Създайте нова от
                                            <Link
                                                to="/recipe/add"
                                                className={styles["recipe-diff-count"]}
                                                style={{ color: "white" }}
                                            >
                                                ТУК
                                            </Link>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </article>
                    </div>
                )}
            </div>
            <ScrollButton />
        </>
    );
};
