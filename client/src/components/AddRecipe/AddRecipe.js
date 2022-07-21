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
            {errorMessage !== "" &&
                <p className="error-message"> {errorMessage.error}</p>
            }
            <title>Добави рецепта</title>

            <h1 className="already-reg">Добави рецепта</h1>

            <form className="add-form" method="POST" onSubmit={createHandler}>
                <div className="already-reg">
                    <label htmlFor="name">име</label>
                    <input type="text" name="name" id="name" onChange={changeHandler}
                        placeholder="някакво име..." required value={values.name} />
                </div>
                <div className="already-reg">
                    <label htmlFor="image">снимка</label>
                    <input type="text" name="image" id="image" onChange={changeHandler}
                        placeholder={"https://some-image.com..."} required value={values.image} />
                </div>
                <div className="already-reg">
                    <label htmlFor="fullRecipe">пълна рецепта</label>
                    <textarea className="add-recipe-text" type="text" id="fullRecipe" name="fullRecipe"
                        onChange={changeHandler} value={values.fullRecipe} placeholder="Първата стъпка е..." required />
                </div >
                <div className="already-reg">
                    <label htmlFor="ingredients">необходими продукти</label>
                    <textarea className="add-recipe-text" type=" text" id="ingredients" name="ingredients"
                        onChange={changeHandler} value={values.ingredients} placeholder="Продукт 1, продукт 2..." required />
                </div>
                <input type="submit" value="създай" className="add-form-submit" />
            </form >
            <div>
                <article className="recipe-details">
                    <h1 className="already-reg">Кратка информация:</h1>
                    <p className="recipe-add">
                        1. Моля въведете името на рецептата на Български език, в полето "име".
                    </p>
                    <p className="recipe-add">
                        2. Моля въведете валиден URL започващ с http:// или https://
                        или можете да качите снимка на вашето ястие, като натиснете бутона "качи симка".
                    </p>
                    <p className="recipe-add">
                        3. В полето "пълна рецепта", моля въведете пълното описание на рецептата. Имайте предвид,
                        че форматирането на текста се запазва.
                    </p>
                    <p className="recipe-add">
                        4. Докато изброявате продуктите в полето "необходими продукти", имайте предвид,
                        че форматирането на текста се запазва, така че, ако желаете можете да ги въвеждате един под друг.
                    </p>
                </article>
            </div>
        </div >
    );
}