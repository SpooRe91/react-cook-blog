import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { FaHeart } from 'react-icons/fa';
//-------------------------------------------------------------------------------------------------
import styles from "./Details.module.css";
import { addLike, getOne } from "../../services/mealService";
//-------------------------------------------------------------------------------------------------
import { OnwerButtons } from "./OwnerButtons"
import { ScrollButton } from "../common/ScrollButton";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";
import { ErrorContext } from "../../contexts/ErrorMessageContext";
//-------------------------------------------------------------------------------------------------
export const Details = ({ isLoading, setIsLoading }) => {
    //-------------------------------------------------------------------------------------------------
    const { user } = useContext(LoggedUserContext);
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);
    //-------------------------------------------------------------------------------------------------
    const navigate = useNavigate();
    const [meal, setMeal] = useState({});
    const { mealId } = useParams();
    //-------------------------------------------------------------------------------------------------
    const [numberOfLikes, setNumberOfLikes] = useState(null);
    const [arrayOfLikes, setArrayOfLikes] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    //-------------------------------------------------------------------------------------------------
    useEffect(() => {
        setIsLoading(true);
        getOne(mealId)
            .then(res => {
                if (!res.isDeleted && res._id) {
                    setMeal(res);
                    setArrayOfLikes(res.likes);
                    setNumberOfLikes(res.likes.length);
                    setIsLoading(false);
                }
                if (res.message) throw new Error(res.message);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error.message);
                return setErrorMessage(error.message);
            });
        return () => {
            setErrorMessage('');
        }
    }, [mealId, setIsLoading, setErrorMessage]);

    //-------------------------------------------------------------------------------------------------
    useEffect(() => {
        if (arrayOfLikes?.find(x => x === user?.id)) {
            setIsLiked(true)
        };
    }, [arrayOfLikes, setIsLiked, user]);

    //-------------------------------------------------------------------------------------------------
    const likeHandler = async (e) => {
        if (!arrayOfLikes.find(x => x === user?.id)) {
            try {
                await addLike(meal._id);
                setIsLiked(true);
                setNumberOfLikes(likes => likes + 1);
            } catch (error) {
                setErrorMessage(error.message);
            }
        } else {
            setErrorMessage("Вече сте харесали тази рецепта!")
        }
    }

    //-------------------------------------------------------------------------------------------------
    const likeHeartWithCount = (
        <span className={styles["number-of-likes"]}>
            <FaHeart className={styles["number-of-likes"]} style={isLiked || user?.id === meal.owner
                ? { 'color': "red" }
                : { 'color': "white" }}
            />{numberOfLikes}
        </span>);

    //-------------------------------------------------------------------------------------------------
    const likeButton = (
        <button type="button" className={styles["like-button"]}
            onClick={(e) => likeHandler(e)}>харесай &#11166;{likeHeartWithCount}
        </button>)

    //-------------------------------------------------------------------------------------------------
    let createdOn = new Date(meal.updatedAt).toString();
    createdOn = createdOn.slice(0, createdOn.indexOf('GMT'));

    //-------------------------------------------------------------------------------------------------
    return (
        <>
            {
                errorMessage !== ""
                    ?
                    <div className={styles["error-container"]}>
                        <p className={styles["error-message"]}>
                            {errorMessage}
                            <button className={styles["btn"]} onClick={() => [setErrorMessage(''), navigate('/', { replace: true })]}>OK</button>
                        </p>
                    </div>
                    :
                    <>

                        <title>Детайли: {meal.name}</title>
                        {

                            isLoading
                                ?
                                <>
                                    <div className={styles["already-reg-loading"]}>
                                        <BeatLoader loading={() => isLoading} color={"white"} />
                                        <p>Моля изчакайте...</p>
                                    </div>
                                </>
                                :
                                <div className={styles["details"]}>
                                    {

                                        <>
                                            <h1 className={styles["meal-name"]}>
                                                {meal.name}
                                            </h1>
                                            <a href={meal.image} target={"_blank"} rel="noreferrer"><img className={styles["meal-details"]} src={meal.image}
                                                alt="" />
                                            </a>
                                            <div>
                                                {user && meal?.owner === user?.id && <OnwerButtons {...meal} setErrorMessage={setErrorMessage} />}
                                            </div>
                                            <div className={styles["like-container"]}>
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
                                                                <span>Няма харесвания</span>
                                                                {likeButton}
                                                            </>
                                                        ://if there is no logged user
                                                        likeHeartWithCount
                                                }
                                                <input type="button" className={styles["delete-confirm-btn"]} onClick={() => navigate(-1)} value="Назад" />
                                            </div>

                                            <article>

                                                <p className={styles["recipe-diff-count"]} style={{ "color": "white" }}>порции: <strong
                                                    style={{ "color": "wheat" }}>
                                                    {meal.portions}
                                                </strong>
                                                </p>

                                                <p className={styles["recipe-diff-count"]} style={{ "color": "white" }}>сложност: <strong
                                                    style={{ "color": "wheat" }}>
                                                    {meal.difficulty}
                                                </strong>
                                                </p>

                                                <p className={styles["recipe-diff-count"]} style={{ "color": "white" }}>Създадено на: <span
                                                    style={meal.updatedAt ? { "color": "wheat" } : { color: "white" }} >
                                                    {createdOn}
                                                </span>
                                                </p>

                                                <p className={styles["recipe-diff-count"]} style={{ "color": "white" }}>Създадено от: <span
                                                    style={meal.ownerName ? { "color": "wheat" } : { color: "white" }}>
                                                    {meal.ownerName}
                                                </span>
                                                </p>

                                            </article>
                                        </>
                                    }
                                </div>
                        }
                        <ScrollButton />
                        {
                            isLoading
                                ?
                                <>
                                    <BeatLoader loading={() => isLoading} color={"white"} />
                                </>
                                :
                                <article className={styles["recipe-details"]}>
                                    <label htmlFor="ingredients">Необходими съставки:</label>
                                    <p className={styles["recipe"]} name="ingredients"><span>{meal.ingredients}</span></p>

                                    <label htmlFor="ingredients">Рецепта:</label>
                                    <p className={styles["recipe"]} name="ingredients"><span>{meal.fullRecipe}</span></p>
                                </article>
                        }
                    </>
            }
            <ScrollButton />
        </>
    );
}