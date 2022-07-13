import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import styles from "./NavBar.module.css"

export const UserNavBar = ({ email, setIsOpen, focusHandler }) => {

    return (
        <>
            <ul>
                <li>
                    <NavLink to="/">Начало</NavLink>
                </li>
                <li>
                    <NavLink to="/recipe/browse" className={focusHandler}>Търсене на рецепти</NavLink>
                </li>
                <li>
                    <NavLink to="/recipe/add" className={focusHandler}>Добави рецепта</NavLink>
                </li>
                <li>
                    <NavLink to="/recipe/myRecipes" className={focusHandler}>Моите рецепти</NavLink>
                </li>
                <li>
                    <NavLink to="#" name="logout" className="logout-main" onClick={(e) => { setIsOpen({ state: true, target: e.target.name }) }}>Изход</NavLink>
                </li>
                <li>
                    <NavLink to="/auth/profile" className={useCallback(({ isActive }) => isActive ? styles['profile-name-active'] : "profile-name", [])}> <strong>{email}</strong></NavLink>
                </li>
            </ul>
        </>
    );
}