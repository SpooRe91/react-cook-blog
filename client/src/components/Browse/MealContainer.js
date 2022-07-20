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

    useEffect(() => {
        if (timesLiked !== null && timesLiked !== undefined) {
            setNumberOfLikes(timesLiked.length);
        }
    }, [timesLiked]);

    const likeHandler = async (e) => {

        if (!timesLiked.find(x => x === user.id)) {
            try {
                await addLike(_id);
                e.target.style.display = "none";
                setNumberOfLikes(likes => likes + 1);
            } catch (error) {
                setErrorMessage({ error: error.message })
            }
        } else {
            setErrorMessage({ error: "Вече сте харесали тази рецепта!" })
        }
    }

    const isLiked = timesLiked?.find(x => x === user?.id);

    const likeHeartWithCount = (<span className="number-of-likes">
        <FaHeart className="like-icon" />  {numberOfLikes}
    </span>);

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
                    numberOfLikes !== 0
                        ? //if we have likes on the current item
                        user
                            ? //if we have logged user
                            user.id === owner
                                ? //if the logged user is owner
                                likeHeartWithCount
                                :
                                //if the logged user is not owner
                                isLiked
                                    ?
                                    //if the logged user liked this already
                                    <>
                                        {likeHeartWithCount}
                                        <span>Харесано от Вас!</span>
                                    </>
                                    ://if the logged user has not liked it yet
                                    <>
                                        <input type="button" className="like-button" onClick={(e) => likeHandler(e)} value="харесай" />
                                        <>
                                            {likeHeartWithCount}
                                        </>
                                    </>
                            :
                            //if there is no logged user
                            likeHeartWithCount
                        :
                        //if there are no likes
                        <>
                            {/* if there are no likes, and the user is not the owner */}
                            {user && user.id !== owner &&
                                <input type="button" className="like-button" onClick={(e) => likeHandler(e)} value="харесай" />}

                            {errorMessage &&
                                <p className="error-message"> {errorMessage.error}</p>
                            }
                            <span className="meal">Няма харесвания</span>
                        </>
                }
            </div >
        </>
    );
};