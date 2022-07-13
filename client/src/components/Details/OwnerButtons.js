import { Link } from "react-router-dom"
export const OnwerButtons = (props) => {
    return (
        <>
            <Link className="btn-details" to={`/edit/${props.meal._id}`}>Промени</Link>
            <Link className="btn-details" to={`/delete/${props.meal._id}`}>Изтрии</Link>
            <Link className="btn-details" to="/recipe/browse">Назад</Link>
        </>
    );
}