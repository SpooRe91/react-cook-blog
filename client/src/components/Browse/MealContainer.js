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
        if (timesLiked !== null && timesLiked !== undefined) {
            setNumberOfLikes(timesLiked.length);
        }

        if (timesLiked.find(x => x === user.id)) {
            setIsLiked(true)
        }
    }, [timesLiked, setIsLiked, user.id]);

    const likeHandler = async (e) => {
        const alreadyLiked = timesLiked.find(x => x === user.id);

        if (!alreadyLiked) {
            try {
                await addLike(_id);
                setIsLiked(true);
                setNumberOfLikes(likes => likes + 1);
            } catch (error) {
                setErrorMessage({ error: error.message })
            }
        } else {
            setErrorMessage({ error: "Вече сте харесали тази рецепта!" })
        }
    }



    const likeHeartWithCount = (
        <span className="number-of-likes">
            <FaHeart className="number-of-likes" />{numberOfLikes}
        </span>);

    const likeButton = (
        <button type="button" className="like-button"
            onClick={(e) => likeHandler(e)}>харесай &#11166;{likeHeartWithCount}
        </button>
    )

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
                    user !== null && user.id !== owner
                        ?
                        numberOfLikes !== 0
                            ?
                            isLiked
                                ?
                                <span>Харесано от Вас! {likeHeartWithCount}</span>
                                :
                                <>
                                    {likeButton}
                                </>
                            :
                            <>
                                <span className="meal">Няма харесвания</span>
                                {likeButton}

                            </>
                        :
                        <span className="meal">Няма харесвания {likeHeartWithCount}</span>
                }
                {errorMessage &&<p className="error-message"> {errorMessage.error}</p>}
            </div >
        </>
    );
};