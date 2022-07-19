import { useEffect, useState } from "react";
import { create } from "../../services/mealService";
import { useNavigate } from "react-router-dom";

export const AddRecipe = ({ errorMessage, setErrorMessage, setIsLoading }) => {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        image: '',
        fullRecipe: '',
        ingredients: ''
    });

    const changeHandler = (e) => {
        setValues(state => ({
            ...state, [e.target.name]: e.target.value
        }));
        setErrorMessage('');
    };

    const createHandler = (e) => {
        e.preventDefault();
        create(values)
            .then(res => {
                console.log(res)
                if (res._id) {
                    navigate('/recipe/myRecipes');
                    setIsLoading(false);
                } else {
                    console.log(res.message);
                    setErrorMessage({ error: res.message });
                    throw new Error(res.message);
                }
            })
    }

    //removes the error message
    useEffect(() => {
        return () => {
            setErrorMessage('');
        }
    }, [setErrorMessage])

    return (

        <div>
            <title>Добави рецепта</title>
            {errorMessage !== ""
                ? <p className="error-message"> {errorMessage.error}</p>
                : ""
            }
            <h1 className="already-reg">Добави рецепта</h1>

            <form className="add-form" method="POST" onSubmit={createHandler}>
                <div className="already-reg">
                    <label htmlFor="name">Име</label>
                    <input type="text" name="name" onChange={changeHandler} required value={values.name} />
                </div>
                <div className="already-reg">
                    <label htmlFor="image">Снимка</label>
                    <input type="text" name="image" onChange={changeHandler} required value={values.image} />
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
    );
}