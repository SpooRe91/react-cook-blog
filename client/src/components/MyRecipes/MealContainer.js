import { Link } from "react-router-dom";
import { FaHeart } from 'react-icons/fa'
import { useEffect, useState } from "react";

import styles from "./MyRecipes.module.css";

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
    }, [numberOfLikes, setNumberOfLikes, setIsLiked]);

    const likeHeartWithCount = (
        <span className={styles["number-of-likes"]}>
            <FaHeart className={styles["number-of-likes"]} style={isLiked
                ? { 'color': "red" }
                : { 'color': "white" }}
            />{numberOfLikes}
        </span>);

    return (
        <>
            <div className={styles['meal']} data={_id}>
                <Link to={`/details/${_id}`} >
                    <p className={styles["name"]}>{name}</p>
                </Link>
                <Link to={`/details/${_id}`} className={styles['meal-image-link']}>
                    <img className={styles['meal']} src={image} alt="" /></Link>
                <Link className={styles.btn} to={`/details/${_id}`}>Подробно</Link>
                {
                    numberOfLikes !== 0
                        ? //if we have likes on the current item
                        likeHeartWithCount
                        : <>
                            {/* //if there is no logged user */}
                            <span className={styles['meal']}>Няма харесвания</span>
                        </>
                }
                {errorMessage &&
                    <p className={styles["error-message"]}> {errorMessage}</p>
                }
            </div >
        </>
    );
};