export const Meal = (meal) => {
    return (
        <div className="meal">
            <a href="/details/{{_id}}">
                <p className="name">{meal.name}</p>
                <img className="meal" src={meal.image} alt="" />
            </a>
            <a className="btn" href={`/details/${meal._id}`}>Подробно</a>
        </div>
    );
}