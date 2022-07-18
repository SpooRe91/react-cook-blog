import { useEffect, useState } from "react";
import { OnwerButtons } from "./OwnerButtons"
import { addLike, getOne } from "../../services/mealService";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { FaHeart } from 'react-icons/fa'

export const Details = ({ user, isLoading, setIsLoading, setErrorMessage, errorMessage }) => {

    const [meal, setMeal] = useState({});
    const { mealId } = useParams();

    const [numberOfLikes, setNumberOfLikes] = useState(0);
    const [arrayOfLikes, setArrayOfLikes] = useState([]);

    useEffect(() => {
        getOne(mealId)
            .then(res => {
                if (res._id) {
                    setMeal(res);
                    setArrayOfLikes(res.likes);
                    setNumberOfLikes(res.likes.length);
                    setIsLoading(false);
                } else {
                    console.log(res.message);
                    setErrorMessage({ error: res.message });
                    throw new Error(res.message);
                }
            })
    }, [mealId, setIsLoading, setErrorMessage]);

    const likeHandler = async (e) => {

        if (!arrayOfLikes.find(x => x === user.id)) {
            try {
                await addLike(meal._id);
                e.target.style.display = "none";
                setNumberOfLikes(likes => likes + 1);

            } catch (error) {
                setErrorMessage({ error: error.message })
            }
        } else {
            setErrorMessage({ error: "You have already liked this recipe!" })
        }
    }

    return (
        <>
            <title>Детайли: {meal.name}</title>
            <div className="details">
                {
                    isLoading
                        ? <><BeatLoader loading={() => isLoading} /></>
                        : <>
                            <h1 className="meal-name">{meal.name}</h1>
                            <a href={meal.image} target={"_blank"} rel="noreferrer"><img className="meal-details" src={meal.image}
                                alt="" /></a>
                            <div>
                                {
                                    user && meal.owner === user.id && <OnwerButtons {...meal} />
                                }
                            </div>
                            <div className="like-container">
                                {
                                    arrayOfLikes.length !== 0
                                        ?
                                        //if we have likes on the current item
                                        user
                                            ? //if we have logged user
                                            user.id === meal.owner
                                                ? //if the logged user is owner
                                                <span className="number-of-likes">
                                                    <FaHeart className="like-icon" /> {numberOfLikes === 1 ? `${numberOfLikes} храесване` : `${numberOfLikes} харесвания`} </span>
                                                ://if the logged user is not owner
                                                arrayOfLikes.find(x => x === user.id)
                                                    ? //if the logged user liked this already
                                                    <>
                                                        <span className="number-of-likes">Харесано от Вас!</span>
                                                        <span className="number-of-likes">
                                                            <FaHeart className="like-icon" /> {numberOfLikes === 1 ? `${numberOfLikes} храесване` : `${numberOfLikes} харесвания`}</span>
                                                    </>
                                                    ://if the logged user has not liked it yet
                                                    <>
                                                        <input type="button" className="name" onClick={(e) => likeHandler(e)} value="Like" />
                                                        {errorMessage
                                                            ? <p className="error-message"> {errorMessage.error}</p>
                                                            : ""
                                                        }
                                                        <span className="number-of-likes">
                                                            <FaHeart className="like-icon" /> {numberOfLikes === 1 ? `${numberOfLikes} храесване` : `${numberOfLikes} харесвания`}</span>
                                                    </>
                                            ://if there is no logged user
                                            <span className="number-of-likes">
                                                <FaHeart className="like-icon" /> {numberOfLikes === 1 ? `${numberOfLikes} храесване` : `${numberOfLikes} харесвания`} </span>
                                        ://if there are no likes
                                        <>
                                            <button className="name" onClick={(e) => likeHandler(e)}>Like</button>
                                            <h4 className="meal">Няма храесвания</h4>
                                        </>
                                }
                            </div>

                            <article className="recipe-details">
                                <label htmlFor="ingredients">Необходими съставки:</label>
                                <p className="recipe" name="ingredients"><span>{meal.ingredients}</span></p>
                                <label htmlFor="ingredients">Рецепта:</label>
                                <p className="recipe" name="ingredients"><span>{meal.fullRecipe}</span></p>
                            </article>
                            {
                                user && user.id !== meal.owner
                                    ? < p className="created-by-details"><span >Създадено от {meal.ownerName}</span></p>
                                    : ""
                            }
                        </>
                }
                {errorMessage !== ""
                    ? <p className="error-message"> {errorMessage.error}</p>
                    : ""
                }
            </div >
        </>
    );
}