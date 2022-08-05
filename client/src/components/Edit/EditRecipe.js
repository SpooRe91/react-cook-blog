import { useNavigate, useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import styles from "./EditRecipe.module.css";

import { getOne, editMeal } from "../../services/mealService";
import { ErrorContext } from "../../contexts/ErrorMessageContext";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";

export const EditRecipe = ({ setIsLoading }) => {
    const navigate = useNavigate();

    const { ...props } = useContext(LoggedUserContext);
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);

    const [meal, setMeal] = useState({});
    const { mealId } = useParams();

    useEffect(() => {
        if (!props.user) {
            navigate('/404');
        };
    });

    const [values, setValues] = useState({
        name: '',
        image: '',
        portions: 0,
        difficulty: '',
        ingredients: '',
        fullRecipe: '',
    });

    useEffect(() => {
        getOne(mealId)
            .then(res => {
                if (res !== undefined && res !== null) {
                    setMeal(res);
                    setValues(res);
                    setIsLoading(false);
                } else {
                    throw new Error('No recipe found!')
                }
                if (res.message) throw new Error(res.message);
            })
            .catch(error => {
                console.log(error.message);
                setErrorMessage({ error: error.message });
            })
    }, [mealId, setIsLoading, setErrorMessage]);


    const changeHandler = (e) => {
        setValues(state => ({
            ...state, [e.target.name]: e.target.value
        }));
        setErrorMessage('');
    };


    const editHandler = (e) => {
        e.preventDefault();

        editMeal(mealId, values)
            .then(res => {
                if (res.acknowledged && res.modifiedCount !== 0) {
                    setMeal(res);
                    setIsLoading(false);
                    navigate(`/details/${meal._id}`);
                }
                if (res.message) throw new Error(res.message);
            })
            .catch(error => {
                console.log(error);
                setErrorMessage({ error: error.message });
            })
        return () => {
            setErrorMessage('');
        }
    }

    return (
        <div>
            <title>Промени рецепта {meal.name}</title>
            {errorMessage !== "" &&
                <div className={styles["error-container"]}>
                    <p className={styles["error-message"]}>
                        {errorMessage.error}
                        <button className={styles["btn"]} onClick={() => setErrorMessage('')}>
                            OK
                        </button>
                    </p>
                </div>
            }
            <h1 className={styles["already-reg"]}>Промени рецепта</h1>

            <form className={styles["add-form"]} method="POST" onSubmit={editHandler}>
                <div className={styles["already-reg"]}>
                    <label htmlFor="name">Име</label>
                    <input type="text" name="name" value={values.name} onChange={changeHandler} required />
                </div>
                <div className={styles["already-reg"]}>
                    <label htmlFor="image">Снимка</label>
                    <input type="text" name="image" value={values.image} onChange={changeHandler} required />
                </div>

                <div className={styles["already-reg"]}>
                    <label htmlFor="portions">брой порции</label>
                    <input type="number" name="portions" id="portions" onChange={changeHandler}
                        placeholder={4} required value={values.portions < 0 ? 0 : values.portions} />
                </div>

                <label htmlFor="difficulty">трудност</label>
                <div className={styles["select-container"]}>
                    <select name="difficulty" id="difficulty" className={styles["select-difficulty"]} onChange={changeHandler}>
                        <option defaultValue=""></option>
                        <option value="лесно">лесно</option>
                        <option value="средно">средно</option>
                        <option value="за напреднали">за напреднали</option>
                        <option value="трудно">трудно</option>
                    </select>
                </div>
                
                <div className={styles["already-reg"]}>
                    <label htmlFor="fullRecipe">Пълна рецепта</label>
                    <textarea className={styles["add-recipe-text"]} type="text" name="fullRecipe" onChange={changeHandler} value={values.fullRecipe} required />
                </div >
                <div className={styles["already-reg"]}>
                    <label htmlFor="ingredients">Необходими продукти</label>
                    <textarea className={styles["add-recipe-text"]} type=" text" name="ingredients" onChange={changeHandler} value={values.ingredients} required />
                </div>
                <input type="submit" value="Промени" className={styles["add-form-submit"]} />
                <Link to={`/details/${mealId}`} className={styles["btn"]}>назад</Link>
            </form >

        </div >
    )

}