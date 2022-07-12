import { NavLink } from 'react-router-dom';
export const GuestNavBar = ({ focusHandler }) => {

    return (
        <ul>
            <li>
                <NavLink to="/" className={focusHandler}>Начало</NavLink>
            </li>
            <li>
                <NavLink to="/recipe/browse" className={focusHandler}>Търсене на рецепти</NavLink>
            </li>
            <li>
                <NavLink to="/auth/register" className={focusHandler}>Регистрация</NavLink>
            </li>
            <li>
                <NavLink to="/auth/login" className={focusHandler}>Вход</NavLink>
            </li>
        </ul >
    );
}