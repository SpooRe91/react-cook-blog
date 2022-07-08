import { Link } from "react-router-dom";
export const GuestNavBar = () => {

    return (
        <ul>
            <li>
                <Link to="/">Начало</Link>
            </li>
            <li>
                <Link to="/recipe/browse">Търсене на рецепти</Link>
            </li>
            <li>
                <Link to="/auth/register">Регистрация</Link>
            </li>
            <li>
                <Link to="/auth/login">Вход</Link>
            </li>
        </ul>
    );
}