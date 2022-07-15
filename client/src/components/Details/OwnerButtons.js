import { Link } from "react-router-dom"
export const OnwerButtons = (props) => {

    return (
        <>
            <Link className="btn-details" to={`/edit/${props.meal._id}`}>Промени</Link>
            <Link className="btn-details" to={`/delete/${props.meal._id}`}>Изтрии</Link>
            <div className="dropdown">
                <button className="dropbtn">&#11167; oбратно към &#11167;</button>
                <div className="dropdown-content">
                    <Link className="btn-details-back" to="/recipe/browse">към всички рецепти</Link>
                    <Link className="btn-details-back" to="/recipe/browse">към моите рецепти</Link>
                </div>
            </div>

        </>
    );
}