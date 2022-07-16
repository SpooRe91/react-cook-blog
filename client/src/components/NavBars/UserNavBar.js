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
                    <NavLink to="/recipe/browse" className={focusHandler}>търсене на рецепти</NavLink>
                </li>
                <li>
                    <NavLink to="/recipe/add" className={focusHandler}>добави рецепта</NavLink>
                </li>
                <li>
                    <NavLink to="/recipe/myRecipes" className={focusHandler}>моите рецепти</NavLink>
                </li>
                <li>
                    <NavLink to="/recipe/macros" className={focusHandler}>хранителни стойности</NavLink>
                </li>
                <li>
                    <NavLink to="#" name="logout" className="logout-main" onClick={(e) => { setIsOpen({ state: true, target: e.target.name }) }}>изход</NavLink>
                </li>
                <li>
                    <NavLink to="/auth/profile" className={useCallback(({ isActive }) => isActive ? styles['profile-name-active'] : "profile-name", [])}> <strong>{email}</strong></NavLink>
                </li>
            </ul>
        </>
    );
}