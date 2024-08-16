import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export const GuestNavBar = ({ focusHandler, isMobile }) => {
    return (
        <ul className={styles[!isMobile ? "nav-list" : "nav-list-mobile"]}>
            <li>
                <NavLink to="/" className={focusHandler}>
                    начало
                </NavLink>
            </li>
            <li>
                <NavLink to="/recipe/browse" className={focusHandler}>
                    търсене на рецепти
                </NavLink>
            </li>
            <li>
                <NavLink to="/recipe/macros" className={focusHandler}>
                    хранителни стойности
                </NavLink>
            </li>
            <li>
                <NavLink to="/auth/register" className={focusHandler}>
                    регистрация
                </NavLink>
            </li>
            <li>
                <NavLink to="/auth/login" className={focusHandler}>
                    вход
                </NavLink>
            </li>
        </ul>
    );
};
