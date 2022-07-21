import { Link } from "react-router-dom";
import { FaHeart } from 'react-icons/fa'
import { useEffect, useState } from "react";

export const MealContainer = ({
    _id,
    name,
    image,
    timesLiked,
    errorMessage }) => {

    const [isLiked, setIsLiked] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(0);

    useEffect(() => {
        if (timesLiked.length !== numberOfLikes) {
            setNumberOfLikes(timesLiked.length);
            setIsLiked(true)
        }
    }, [setNumberOfLikes, setIsLiked]);

    const likeHeartWithCount = (
        <span className="number-of-likes">
            <FaHeart className="number-of-likes" style={isLiked
                ? { 'color': "red" }
                : { 'color': "white" }}
            />{numberOfLikes}
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
                        likeHeartWithCount
                        : <>
                            {/* //if there is no logged user */}
                            <span className="meal">Няма харесвания</span>
                        </>
                }
                {errorMessage &&
                    <p className="error-message"> {errorMessage.error}</p>
                }
            </div >
        </>
    );
};