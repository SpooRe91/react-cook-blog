import { Link } from "react-router-dom";
export const UserNavBar = (props) => {

    return (
        <ul>
            <li>
                <Link to="/">Начало</Link>
            </li>
            <li>
                <Link to="/recipe/browse">Търсене на рецепти</Link>
            </li>
            <li>
                <Link to="/recipe/add">Добави рецепта</Link>
            </li>
            <li>
                <Link to="/recipe/myRecipes">Моите рецепти</Link>
            </li>
            <li>
                <Link to="/recipe/myRecipes" className="profile-name"><strong>{props.email}</strong></Link>
            </li>
            <li>
                <Link to="/auth/login">Изход</Link>
            </li>
        </ul>
    );
}