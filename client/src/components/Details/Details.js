import { useEffect, useState } from "react";
import { OnwerButtons } from "./OwnerButtons"
import { getOne } from "../../services/mealService";
import { Link, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

export const Details = ({ isLoading, setIsLoading, setErrorMessage, errorMessage }) => {

    const [meal, setMeal] = useState({});
    let id = useParams();

    useEffect(() => {
        getOne({ ...id })
            .then(res => {
                if (res._id) {
                    setMeal(res);
                    setIsLoading(false);
                } else {
                    console.log(res.message);
                    setErrorMessage({ error: res.message });
                    throw new Error(res.message);
                }
            })
    }, []);

    return (
        <>
            <div className="details">
                {
                    isLoading
                        ? <><BeatLoader loading={() => isLoading} /></>
                        : <>
                            <h1 className="meal-name">{meal.name}</h1>
                            <a href={meal.image} target="_blank" rel="noreferrer"><img className="meal-details" src={meal.image}
                                alt="" /></a>
                            <div className="meal-buttons">
                                {meal.owner !== undefined && meal.owner !== null
                                    ? <OnwerButtons meal={meal} />
                                    : <Link className="btn" to="/recipe/browse">Назад</Link>
                                }
                            </div>
                            <article className="recipe-details">
                                <label htmlFor="ingredients">Необходими съставки:</label>
                                <p className="recipe" name="ingredients"><span>{meal.ingredients}</span></p>
                                <label htmlFor="ingredients">Рецепта:</label>
                                <p className="recipe" name="ingredients"><span>{meal.fullRecipe}</span></p>
                            </article>
                        </>
                }
                {errorMessage !== ""
                    ? <p className="error-message"> {errorMessage.error}</p>
                    : ""
                }
            </div >
        </>
    );
}