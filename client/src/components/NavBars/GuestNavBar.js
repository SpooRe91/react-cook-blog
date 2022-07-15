import { NavLink } from 'react-router-dom';
export const GuestNavBar = ({ focusHandler }) => {

    return (
        <ul>
            <li>
                <NavLink to="/" className={focusHandler}>начало</NavLink>
            </li>
            <li>
                <NavLink to="/recipe/browse" className={focusHandler}>търсене на рецепти</NavLink>
            </li>
            <li>
                <NavLink to="/recipe/macros" className={focusHandler}>хранителност</NavLink>
            </li>
            <li>
                <NavLink to="/auth/register" className={focusHandler}>регистрация</NavLink>
            </li>
            <li>
                <NavLink to="/auth/login" className={focusHandler}>вход</NavLink>
            </li>
        </ul >
    );
}