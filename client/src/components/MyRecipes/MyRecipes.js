import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { getOwn } from "../../services/mealService";
import { MealContainer } from "./MealContainer"
import { ScrollButton } from "../Browse/ScrollButton";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";
import { ErrorContext } from "../../contexts/ErrorMessageContext";
export const MyRecipes = ({ isLoading, setIsLoading }) => {

    const user = useContext(LoggedUserContext);
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);

    const [filterValue, setFilterValue] = useState("");
    const [notDeleted, setNotDeleted] = useState([])

    useEffect(() => {
        getOwn()
            .then(res => {
                if (res.length > 0) {
                    setNotDeleted(state => res.filter(x => x.isDeleted !== true));
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                }
                if (res.message) throw new Error(res.message);
            }).catch(error => {
                console.log(error.message);
                setErrorMessage({ error: error.message });
            });
        return () => {
            setErrorMessage('');
        }
    }, [setIsLoading, setErrorMessage]);


    const filterHandler = (e) => {
        setFilterValue(e.target.value.toLowerCase());
    };

    return (
        <>
            <title>Моите рецепти</title>
            {errorMessage !== "" &&
                <div className="error-container">
                    <p className="error-message">
                        {errorMessage.error}
                        <button className="btn" onClick={() => setErrorMessage('')}>OK</button>
                    </p>
                </div>
            }
            <div className="search-container">
                <div>
                    <h1 className="already-reg">Моите рецепти</h1>
                    <form className="search" method="GET">
                        <input type="text" className="recipe-browse" placeholder="Търси..." name="search"
                            value={filterValue} onChange={filterHandler} />
                    </form>
                </div>
                {
                    < div className="meal-containter">
                        {
                            isLoading
                                ?
                                <div className="already-reg">
                                    <BeatLoader loading={isLoading} />
                                    <p>Вашите рецепти се зареждат... <Link to="/recipe/add" className="already-reg">ТУК</Link></p>
                                </div>
                                :
                                filterValue
                                    ?
                                    notDeleted.filter(x => x.name.toLowerCase().includes(filterValue))
                                        .map(meal =>
                                            <MealContainer key={meal._id} {...meal}
                                                timesLiked={meal.likes} user={user}
                                                setErrorMessage={setErrorMessage} errorMessage={errorMessage} />)
                                    :
                                    notDeleted !== undefined && notDeleted !== null && notDeleted?.length > 0
                                        ?
                                        notDeleted.map(meal =>
                                            <MealContainer key={meal._id} {...meal}
                                                timesLiked={meal.likes} user={user}
                                                setErrorMessage={setErrorMessage} errorMessage={errorMessage} />)
                                        :
                                        <div className="already-reg">
                                            <p>За сега няма намерени рецепти, добавете рецепта <Link to="/recipe/add" className="already-reg">ТУК</Link></p>
                                        </div>
                        }
                    </div>
                }
            </div >
            <ScrollButton />
        </>
    );
}