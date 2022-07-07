export const MealContainer = (props) => {

    return (
        <div className="meal">
            <a href={`/details/${props._id}`}>
                <p className="name">{props.name}</p>
            </a>
            <a href={`/details/${props._id}`}>
                <img className="meal" src={props.image} alt="" />
            </a>
            <a className="btn" href={`/details/${props._id}`}>Подробно</a>
        </div >
    );
};