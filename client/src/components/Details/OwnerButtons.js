import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { deleteMeal } from "../../services/mealService";
export const OnwerButtons = ({ _id, setErrorMessage }) => {

    const navigate = useNavigate();

    const [isClicked, setIsClicked] = useState(false);

    const deleteHandler = (e) => {
        deleteMeal(_id)
            .then(res => {
                if (res.status === 202) {

                    navigate('/recipe/myRecipes');
                }
                console.log(res);
                if (res.message) throw new Error(res.message);
            })
            .catch(error => {
                setErrorMessage({ error: error.message })
            });
    };

    const confirmHandler = (e) => {
        setIsClicked(state => !state);
    }

    return (
        <>
            {
                isClicked
                    ?
                    <div className="owner-buttons">
                        <p>Сигурни ли сте, че искате да изтриете рецептата?</p>
                        <input type="button" className="delete-confirm-btn" onClick={deleteHandler} value="да" />
                        <input type="button" className="delete-confirm-btn" onClick={confirmHandler} value="не"/>
                    </div>
                    :
                    <div className="owner-buttons">
                        <Link className="btn-details" to={`/edit/${_id}`}>промени</Link>
                        <input type="button" className="delete-confirm-btn" onClick={confirmHandler} value="изтрий" />
                    </div>
            }
        </>
    );
}