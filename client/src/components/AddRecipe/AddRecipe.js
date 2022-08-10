import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
//-------------------------------------------------------------------------------------------------
import styles from "./AddRecipe.module.css";
//-------------------------------------------------------------------------------------------------
import { create } from "../../services/mealService";
import { ErrorContext } from "../../contexts/ErrorMessageContext";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";

export const AddRecipe = ({ setIsLoading }) => {
    //-------------------------------------------------------------------------------------------------
    const navigate = useNavigate();
    const { user } = useContext(LoggedUserContext);
    //-------------------------------------------------------------------------------------------------
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);
    const [values, setValues] = useState({
        name: '',
        image: '',
        portions: 0,
        difficulty: '',
        ingredients: '',
        fullRecipe: '',
    });

    //-------------------------------------------------------------------------------------------------
    useEffect(() => {
        return () => {
            setErrorMessage('');
        }
    }, [setErrorMessage, navigate, user]);

    //-------------------------------------------------------------------------------------------------
    const changeHandler = (e) => {
        setValues(state => ({
            ...state, [e.target.name]: e.target.value
        }));
        setErrorMessage('');
    };
    //-------------------------------------------------------------------------------------------------
    const createHandler = (e) => {
        e.preventDefault();
        create(values)
            .then(res => {
                console.log(res)
                if (res._id) {
                    navigate('/recipe/myRecipes', { replace: true });
                    setIsLoading(false);
                }
                if (res.message) throw new Error(res.message);
            })
            .catch(error => {
                console.log(error.message);
                setErrorMessage(error.message);
            })
    }
    //-------------------------------------------------------------------------------------------------
    return (
        <>
            <title>Добави рецепта</title>

            <h1 className={styles["already-reg"]}>Добави рецепта</h1>

            <form className={styles["add-form"]} method="POST" onSubmit={createHandler}>
                <div className={styles["already-reg"]}>
                    <label htmlFor="name">име</label>
                    <input type="text" name="name" id="name" onChange={changeHandler}
                        placeholder="някакво име..." required value={values.name} />
                </div>

                <div className={styles["already-reg"]}>
                    <label htmlFor="image">снимка</label>
                    <input type="text" name="image" id="image" onChange={changeHandler}
                        placeholder={"https://some-image.com..."} required value={values.image} />
                </div>

                <div className={styles["already-reg"]}>
                    <label htmlFor="portions">брой порции</label>
                    <input type="number" name="portions" id="portions" onChange={changeHandler}
                        placeholder={4} required value={values.portions <= 0 ? 0 : values.portions} />
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
                    <label htmlFor="ingredients">необходими продукти</label>
                    <textarea className={styles["add-recipe-text"]} type=" text" id="ingredients" name="ingredients"
                        onChange={changeHandler} value={values.ingredients} placeholder="Продукт 1, продукт 2..." required />
                </div>

                <div className={styles["already-reg"]}>
                    <label htmlFor="fullRecipe">пълна рецепта</label>
                    <textarea className={styles["add-recipe-text"]} type="text" id="fullRecipe" name="fullRecipe"
                        onChange={changeHandler} value={values.fullRecipe} placeholder="Първата стъпка е..." required />
                </div >


                <input type="submit" value="създай" className={styles["add-form-submit"]} />
                <Link to={'/recipe/browse'} className={styles["btn"]}>назад</Link>

            </form >
            <div>
                <article className={styles["recipe-details"]}>
                    <h1 className={styles["already-reg"]}>Кратка информация:</h1>
                    <p className={styles["recipe-add"]}>
                        1. Моля въведете името на рецептата на Български език, в полето "име".
                    </p>
                    <p className={styles["recipe-add"]}>
                        2. Моля въведете валиден URL започващ с http:// или https://
                    </p>

                    <p className={styles["recipe-add"]}>
                        3. Моля въведете броят на порциите, които предоставя тази рецепта.
                    </p>
                    <p className={styles["recipe-add"]}>
                        4. Моля въведете трудността на рецептата от падащото меню със заглавие "трудност".
                    </p>
                    <p className={styles["recipe-add"]}>
                        5. В полето "пълна рецепта", моля въведете пълното описание на рецептата. Имайте предвид,
                        че форматирането на текста се запазва.
                    </p>
                    <p className={styles["recipe-add"]}>
                        6. Докато изброявате продуктите в полето "необходими продукти", имайте предвид,
                        че форматирането на текста се запазва, така че, ако желаете можете да въвеждате продуктите един под друг.
                    </p>
                    {errorMessage !== "" &&
                        <div className={styles["error-container"]}>
                            <p className={styles["error-message"]}>
                                {errorMessage}
                                <button className={styles["btn"]} onClick={() => setErrorMessage('')}>OK</button>
                            </p>
                        </div>
                    }
                </article>
            </div>
        </>
    );
}