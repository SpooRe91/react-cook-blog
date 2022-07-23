import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { FaHeart } from 'react-icons/fa'

import { addLike, getOne } from "../../services/mealService";

import { OnwerButtons } from "./OwnerButtons"
import { ScrollButton } from "../Browse/ScrollButton";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";
import { ErrorContext } from "../../contexts/ErrorMessageContext";

export const Details = ({ isLoading, setIsLoading }) => {

    const user = useContext(LoggedUserContext);
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);

    const [meal, setMeal] = useState({});
    const { mealId } = useParams();

    const [numberOfLikes, setNumberOfLikes] = useState(0);
    const [arrayOfLikes, setArrayOfLikes] = useState([]);

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        getOne(mealId)
            .then(res => {
                if (!res.isDeleted) {
                    setMeal(res);
                    setArrayOfLikes(res.likes);
                    setNumberOfLikes(res.likes.length);
                    setIsLoading(false);
                } else {
                    throw new Error("Не е намерена такава рецепта!");
                }
                if (res.message) throw new Error(res.message);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error.message);
                setErrorMessage({ error: error.message });
            });
        return () => {
            setErrorMessage('');
        }
    }, [mealId, setIsLoading, setErrorMessage]);

    useEffect(() => {
        if (arrayOfLikes?.find(x => x === user?.id)) {
            setIsLiked(true)
        };
    }, [arrayOfLikes, setIsLiked, user]);


    const likeHandler = async (e) => {
        if (!arrayOfLikes.find(x => x === user?.id)) {
            try {
                await addLike(meal._id);
                setIsLiked(true);
                setNumberOfLikes(likes => likes + 1);
            } catch (error) {
                setErrorMessage({ error: error.message });
            }
        } else {
            setErrorMessage({ error: "Вече сте харесали тази рецепта!" })
        }
    }

    const likeHeartWithCount = (
        <span className="number-of-likes">
            <FaHeart className="number-of-likes" style={isLiked || user?.id === meal.owner
                ? { 'color': "red" }
                : { 'color': "white" }}
            />{numberOfLikes}
        </span>);

    const likeButton = (
        <button type="button" className="like-button"
            onClick={(e) => likeHandler(e)}>харесай &#11166;{likeHeartWithCount}
        </button>)


    return (
        <>
            <title>Детайли: {meal.name}</title>
            {errorMessage !== "" &&
                <div className="error-container">
                    <p className="error-message">
                        {errorMessage.error}
                        <button className="btn" onClick={() => setErrorMessage('')}>OK</button>
                    </p>
                </div>
            }
            <div className="details">
                {
                    isLoading
                        ?
                        <>
                            <BeatLoader loading={() => isLoading} />
                        </>
                        :
                        <>
                            <h1 className="meal-name">
                                {meal.name}
                            </h1>
                            <a href={meal.image} target={"_blank"} rel="noreferrer"><img className="meal-details" src={meal.image}
                                alt="" />
                            </a>
                            <div>
                                {user && meal.owner === user?.id && <OnwerButtons {...meal} setErrorMessage={setErrorMessage} />}
                            </div>
                            <div className="like-container">
                                {
                                    user !== null && user?.id !== meal.owner
                                        ?//if we have a logged user and is not the owner
                                        numberOfLikes !== 0
                                            ?//if there are likes
                                            isLiked
                                                ?//if the current element is liked by the logged user
                                                <span>Харесано от Вас! {likeHeartWithCount}</span>
                                                ://if  it's not liked by the logged user
                                                <>
                                                    {likeButton}
                                                </>
                                            ://if there are no likes and the user can like it
                                            <>
                                                <span className="meal">Няма харесвания</span>
                                                {likeButton}
                                            </>
                                        ://if there is no logged user
                                        likeHeartWithCount
                                }
                            </div>

                            {
                                user && user?.id !== meal.owner &&
                                < p className="created-by-details"><span >Създадено от {meal.ownerName}</span></p>
                            }
                        </>
                }
                <article>
                    <p className="recipe-diff-count">порции: <strong>{meal.portions}</strong></p>
                    <p className="recipe-diff-count">сложност: <strong>{meal.difficulty}</strong></p>

                </article>
                {<ScrollButton />}
            </div>

            <article className="recipe-details">
                <label htmlFor="ingredients">Необходими съставки:</label>
                <p className="recipe" name="ingredients"><span>{meal.ingredients}</span></p>

                <label htmlFor="ingredients">Рецепта:</label>
                <p className="recipe" name="ingredients"><span>{meal.fullRecipe}</span></p>
            </article>
        </>
    );
}