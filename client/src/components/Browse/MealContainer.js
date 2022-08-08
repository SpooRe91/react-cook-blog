import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from 'react-icons/fa'
import { useContext, useEffect, useState } from "react";
import { addLike } from "../../services/mealService";

import styles from "./Browse.module.css"
import { LoggedUserContext } from "../../contexts/LoggedUserContext";
import { ErrorContext } from "../../contexts/ErrorMessageContext";

export const MealContainer = ({
    _id, name,
    image, owner,
    timesLiked }) => {
        
    const { user } = useContext(LoggedUserContext);
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);

    const [numberOfLikes, setNumberOfLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setErrorMessage('')
    }, [setErrorMessage]);

    useEffect(() => {
        if (timesLiked !== null && timesLiked !== undefined) {
            setNumberOfLikes(timesLiked.length);
        }
        if (timesLiked?.find(x => x === user?.id)) {
            setIsLiked(true)
        }
    }, [timesLiked, setIsLiked, user]);


    const likeHandler = async (e) => {

        if (!timesLiked?.find(x => x === user?.id)) {
            try {
                const result = await addLike(_id);
                if (result.status !== 400) {
                    setIsLiked(true);
                    setNumberOfLikes(likes => likes + 1);
                }
                if (result.message) throw new Error(result.message);
            } catch (error) {
                setErrorMessage(error.message)
            }
        } else {
            setErrorMessage("Вече сте харесали тази рецепта!")
        }
    };

    const likeHeartWithCount = (
        <span className={styles["number-of-likes"]}>
            <FaHeart className={styles["number-of-likes"]} style={isLiked || user?.id === owner
                ? { 'color': "red" }
                : { 'color': "white" }}
            />{numberOfLikes}
        </span>);

    const likeButton = (
        <button type="button" className={styles["like-button"]}
            onClick={(e) => likeHandler(e)}>харесай &#11166;{likeHeartWithCount}
        </button>);

    return (
        <>
            {errorMessage !== ""
                ?
                !_id
                    ?
                    ""
                    :
                    <>
                        <div className={styles["error-container"]}>
                            <p className={styles["error-message"]}>
                                {errorMessage}
                                <button className={styles["btn"]} onClick={() => [setErrorMessage(''), navigate('/')]}>
                                    OK
                                </button>
                            </p>
                        </div>
                    </>
                :
                ""
            }
            <div className={styles["meal"]} data={_id}>
                <Link to={`/details/${_id}`} >
                    <p className={styles["name"]}>{name}</p>
                </Link>
                <Link to={`/details/${_id}`} className={styles["meal-image-link"]}>
                    <img className={styles["meal"]} src={image} alt="" /></Link>
                <Link className={styles["btn"]} to={`/details/${_id}`}>Подробно</Link>
                {
                    user?.token && user?.id !== owner
                        ?//if we have a logged user and is not the owner
                        numberOfLikes !== 0
                            ?//if there are likes
                            isLiked
                                ?//if the current element is liked by the logged user
                                <span>харесано от Вас{likeHeartWithCount}</span>
                                ://if  it's not liked by the logged user
                                <>
                                    {likeButton}
                                </>
                            ://if there are no likes and the user can like it
                            <>
                                <span className={styles["meal"]}>Няма харесвания</span>
                                {likeButton}
                            </>
                        ://if there is no logged user
                        likeHeartWithCount
                }
            </div >
        </>
    );
};