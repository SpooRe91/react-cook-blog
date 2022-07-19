import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOne, editMeal } from "../../services/mealService";


export const EditRecipe = ({ user, errorMessage, setErrorMessage, setIsLoading }) => {

    const navigate = useNavigate();

    const [meal, setMeal] = useState({});
    const { mealId } = useParams();

    const [values, setValues] = useState({
        name: '',
        image: '',
        fullRecipe: '',
        ingredients: ''
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
                console.log(res);
                if (res.ok && res.status === 202) {
                    setMeal(res);
                    setIsLoading(false);
                    navigate('/recipe/myRecipes');
                }
            })
            .catch(error => {
                console.log(error.message);
                setErrorMessage({ error: error.message });
            })
    }

    return (
        <div>
            <title>Промени рецепта {meal.name}</title>
            {errorMessage !== ""
                ? <p className="error-message"> {errorMessage.error}</p>
                : ""
            }
            <h1 className="already-reg">Промени рецепта</h1>

            <form className="add-form" method="POST" onSubmit={editHandler}>
                <div className="already-reg">
                    <label htmlFor="name">Име</label>
                    <input type="text" name="name" value={values.name} onChange={changeHandler} required />
                </div>
                <div className="already-reg">
                    <label htmlFor="image">Снимка</label>
                    <input type="text" name="image" value={values.image} onChange={changeHandler} required />
                </div>
                <div className="already-reg">
                    <label htmlFor="fullRecipe">Пълна рецепта</label>
                    <textarea className="add-recipe-text" type="text" name="fullRecipe" onChange={changeHandler} value={values.fullRecipe} required />
                </div >
                <div className="already-reg">
                    <label htmlFor="ingredients">Необходими продукти</label>
                    <textarea className="add-recipe-text" type=" text" name="ingredients" onChange={changeHandler} value={values.ingredients} required />
                </div>
                <input type="submit" value="Създай" />
            </form >
        </div >
    )

}