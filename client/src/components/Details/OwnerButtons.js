import { Link } from "react-router-dom"
export const OnwerButtons = ({ _id }) => {

    return (
        <>
            <div className="owner-buttons">
                <Link className="btn-details" to={`/edit/${_id}`}>Промени</Link>
                <Link className="btn-details" to={`/delete/${_id}`}>Изтрии</Link>
            </div>
        </>
    );
}