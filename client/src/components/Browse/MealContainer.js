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
    }, []);

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
            setErrorMessage({ error: "You have already liked this recipe!" })
        }
    }

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
                    timesLiked !== null && timesLiked !== undefined
                        ? //if we have likes on the current item
                        user
                            ? //if we have logged user
                            user.id === owner
                                ? //if the logged user is owner
                                <span><FaHeart className="like-icon" /> Общо харесвания {numberOfLikes} </span>
                                ://if the logged user is not owner
                                timesLiked.find(x => x === user.id)
                                    ? //if the logged user liked this already
                                    <>
                                        <span>You already liked this!</span>
                                        <span><FaHeart className="like-icon" /> Харесано {numberOfLikes} пъти</span>
                                    </>
                                    ://if the logged user has not liked it yet
                                    <>
                                        <input type="button" className="name" onClick={(e) => likeHandler(e)} value="Like" />
                                        {errorMessage
                                            ? <p className="error-message"> {errorMessage.error}</p>
                                            : ""
                                        }
                                        <span><FaHeart className="like-icon" /> Харесано {numberOfLikes} пъти</span>
                                    </>
                            ://if there is no logged user
                            <span><FaHeart className="like-icon" /> Общо харесвания {numberOfLikes} </span>
                        ://if there are no likes
                        <>
                            <button className="name" onClick={(e) => likeHandler(e)}>Like</button>
                            {errorMessage
                                ? <p className="error-message"> {errorMessage.error}</p>
                                : ""
                            }
                            <h4 className="meal">Няма храесвания</h4>
                        </>
                }
            </div >
        </>
    );
};