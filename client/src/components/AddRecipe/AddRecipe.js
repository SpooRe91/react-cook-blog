import { useContext, useEffect, useState } from "react";
import { create } from "../../services/mealService";
import { useNavigate, Link } from "react-router-dom";
import { ErrorContext } from "../../contexts/ErrorMessageContext";

export const AddRecipe = ({ setIsLoading }) => {

    const navigate = useNavigate();
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);
    const [values, setValues] = useState({
        name: '',
        image: '',
        portions: 0,
        difficulty: '',
        ingredients: '',
        fullRecipe: '',
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
                    <label htmlFor="portions">брой порции</label>
                    <input type="number" name="portions" id="portions" onChange={changeHandler}
                        placeholder={4} required value={values.portions < 0 ? 0 : values.portions} />
                </div>
                <label htmlFor="difficulty">трудност</label>
                <div className="select-container">
                    <select name="difficulty" id="difficulty" className="select-difficulty" onChange={changeHandler}>
                        <option defaultValue=""></option>
                        <option value="лесно">лесно</option>
                        <option value="средно">средно</option>
                        <option value="за напреднали">за напреднали</option>
                        <option value="трудно">трудно</option>
                    </select>
                </div>
                <div className="already-reg">
                    <label htmlFor="ingredients">необходими продукти</label>
                    <textarea className="add-recipe-text" type=" text" id="ingredients" name="ingredients"
                        onChange={changeHandler} value={values.ingredients} placeholder="Продукт 1, продукт 2..." required />
                </div>
                <div className="already-reg">
                    <label htmlFor="fullRecipe">пълна рецепта</label>
                    <textarea className="add-recipe-text" type="text" id="fullRecipe" name="fullRecipe"
                        onChange={changeHandler} value={values.fullRecipe} placeholder="Първата стъпка е..." required />
                </div >


                <input type="submit" value="създай" className="add-form-submit" />
                <Link to={'/recipe/browse'} className="btn">назад</Link>

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
                        3. Моля въведете броят на порциите, които предоставя тази рецепта.
                    </p>
                    <p className="recipe-add">
                        4. В полето "пълна рецепта", моля въведете пълното описание на рецептата. Имайте предвид,
                        че форматирането на текста се запазва.
                    </p>
                    <p className="recipe-add">
                        5. Докато изброявате продуктите в полето "необходими продукти", имайте предвид,
                        че форматирането на текста се запазва, така че, ако желаете можете да ги въвеждате един под друг.
                    </p>
                    {errorMessage !== "" &&
                        <div className="error-container">
                            <p className="error-message">
                                {errorMessage.error}
                                <button className="btn" onClick={() => setErrorMessage('')}>OK</button>
                            </p>
                        </div>
                    }
                </article>
            </div>
        </div >
    );
}