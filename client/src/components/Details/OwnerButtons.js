import { Link } from "react-router-dom"
export const OnwerButtons = (props) => {
    return (
        <>
            <Link className="btn" to={`/edit/${props.meal._id}`}>Промени</Link>
            <Link className="btn" to={`/delete/${props.meal._id}`}>Изтрии</Link>
            <Link className="btn" to="/recipe/browse">Назад</Link>
        </>
    );
}