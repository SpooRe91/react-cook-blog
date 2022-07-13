import { useEffect, useState } from "react";
import { create } from "../../services/mealService";
import { useNavigate } from "react-router-dom";

export const AddRecipe = ({ setErrorMessage, setIsLoading }) => {
    const navigate = useNavigate();
    const [createdMeal, setCreatedMeal] = useState({});

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

    };

    const createHandler = (e) => {
        e.preventDefault();
        create(values)
            .then(res => {
                console.log(res)
                if (res._id) {
                    setCreatedMeal(state => res);
                    navigate('/recipe/myRecipes');
                    setIsLoading(false);
                } else {
                    console.log(res.message);
                    setErrorMessage({ error: res.message });
                    throw new Error(res.message);
                }
            })
    }

    useEffect(() => {
        return (createdMeal) => {
            setCreatedMeal(createdMeal)
        }
    }, [])

    return (
        <div>
            <h1 className="already-reg">Добави рецепта</h1>
            <p className="form-error">
                First name should be at least 3 characters long!
            </p>
            <form className="add-form" method="POST" onSubmit={createHandler}>
                <div className="already-reg">
                    <label htmlFor="name">Име</label>
                    <input type="text" name="name" onChange={changeHandler} required />
                </div>
                <div className="already-reg">
                    <label htmlFor="image">Снимка</label>
                    <input type="text" name="image" onChange={changeHandler} required />
                </div>
                <div className="already-reg">
                    <label htmlFor="fullRecipe">Пълна рецепта</label>
                    <textarea className="add-recipe-text" type="text" name="fullRecipe" onChange={changeHandler} required></textarea>
                </div >
                <div className="already-reg">
                    <label htmlFor="ingredients">Необходими продукти</label>
                    <textarea className="add-recipe-text" type=" text" name="ingredients" onChange={changeHandler} required></textarea>
                </div>
                <input type="submit" value="Създай" />
            </form >
        </div >
    );
}