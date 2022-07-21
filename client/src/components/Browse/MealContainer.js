import { Link } from "react-router-dom";
import { FaHeart } from 'react-icons/fa'
import { useEffect, useState } from "react";
import { addLike } from "../../services/mealService";

export const MealContainer = ({
    _id, name,
    image, owner,
    timesLiked, user,
    setErrorMessage, errorMessage }) => {

    const [numberOfLikes, setNumberOfLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

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
                setErrorMessage({ error: error.message })
            }
        } else {
            setErrorMessage({ error: "Вече сте харесали тази рецепта!" })
        }
    };

    const likeHeartWithCount = (
        <span className="number-of-likes">
            <FaHeart className="number-of-likes" style={isLiked || user?.id === owner
                ? { 'color': "red" }
                : { 'color': "white" }}
            />{numberOfLikes}
        </span>);

    const likeButton = (
        <button type="button" className="like-button"
            onClick={(e) => likeHandler(e)}>харесай &#11166;{likeHeartWithCount}
        </button>);

    return (
        <>
            <div className="meal" data={_id}>
                <Link to={`/details/${_id}`} >
                    <p className="name">{name}</p>
                </Link>
                <Link to={`/details/${_id}`} className="meal-image-link">
                    <img className="meal" src={image} alt="" /></Link>
                <Link className="btn" to={`/details/${_id}`}>Подробно</Link>
                {
                    user !== null && user?.id !== owner
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
                                <span className="meal">Няма харесвания</span>
                                {likeButton}
                            </>
                        ://if there is no logged user
                        likeHeartWithCount
                }
                {errorMessage && <p className="error-message"> {errorMessage.error}</p>}
            </div >
        </>
    );
};