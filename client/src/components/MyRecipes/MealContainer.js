import { Link } from "react-router-dom";
import { FaHeart } from 'react-icons/fa'
import { useEffect, useState } from "react";

export const MealContainer = ({
    _id,
    name,
    image,
    timesLiked,
    errorMessage }) => {


    const [numberOfLikes, setNumberOfLikes] = useState(0);

    useEffect(() => {
        if (timesLiked !== null && timesLiked !== undefined) {
            setNumberOfLikes(timesLiked.length);

        }
    }, [timesLiked]);

    return (
        <>
            <div className="meal" data={_id}>
                <Link to={`/details/${_id}`} >
                    <p className="name">{name}</p>
                </Link>
                <Link to={`/details/${_id}`} className="meal-image-link">
                    <img className="meal" src={image} alt="" /></Link>
                <Link className="btn    " to={`/details/${_id}`}>Подробно</Link>
                {
                    numberOfLikes !== 0
                        ? //if we have likes on the current item
                        <span className="number-of-likes">
                            <FaHeart className="like-icon" /> {numberOfLikes === 1 ? `${numberOfLikes} храесване` : `${numberOfLikes} харесвания`} </span>
                        : <>
                            {/* //if there is no logged user */}
                            <span className="meal">Няма храесвания</span>
                        </>
                }
                {errorMessage
                    ? <p className="error-message"> {errorMessage.error}</p>
                    : ""
                }
            </div >
        </>
    );
};