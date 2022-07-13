import { Link } from "react-router-dom";

export const MealContainer = (props) => {

    return (
        <>
            <div className="meal">
                <Link to={`/details/${props._id}`} >
                    <p className="name">{props.name}</p>
                </Link>
                <Link to={`/details/${props._id}`} className="meal-image-link">
                    <img className="meal" src={props.image} alt="" /></Link>
                <Link className="btn" to={`/details/${props._id}`}>Подробно</Link>
            </div >
        </>
    );
};