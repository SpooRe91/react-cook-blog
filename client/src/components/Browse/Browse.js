import { Meal } from "./Meal"
export const Browse = (props) => {
    return (
        <>
            <div className="search-container">
                <form method="GET">
                    <input type="text" placeholder="Търси..." name="search" />
                    <input type="submit" value={"Търси"} />
                </form>
            </div>
            <div className="meal-containter">
                {props.meal !== undefined && props.meal !== null
                    ? <Meal meal={props.meal} />
                    : <div className="already-reg">
                        <p>Все още няма рецепти!</p>
                    </div>
                }
            </div>
        </>);
}