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
                    user.id === owner
                        ? <span><FaHeart className="like-icon" /> Общо харесвания {numberOfLikes} </span>
                        :
                        timesLiked !== null && timesLiked !== undefined
                            ?
                            timesLiked.find(x => x === user.id)
                                ?
                                <>
                                    <span>You already liked this!</span>
                                    <span><FaHeart className="like-icon" /> Харесано {numberOfLikes} пъти</span>
                                </>
                                :
                                <>
                                    <input type="button" className="name" onClick={(e) => likeHandler(e)} value="Like" />
                                    {errorMessage
                                        ? <p className="error-message"> {errorMessage.error}</p>
                                        : ""
                                    }
                                    <span><FaHeart className="like-icon" /> Харесано {numberOfLikes} пъти</span>
                                </>
                            :
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