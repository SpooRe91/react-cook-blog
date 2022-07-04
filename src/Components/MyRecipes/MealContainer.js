export const MealContainer = (props) => {
    
    if (props.meal) {
        return (
            <div className="meal">
                <a href={`/details/${props.meal._id}`}>
                    <p className="name">{props.meal.name}</p>
                    <img className="meal" src={props.meal.image} alt="" />
                </a>
                <a className="btn" href={`/details/${props.meal._id}`}>Подробно</a>
            </div>
        );
    }
}

