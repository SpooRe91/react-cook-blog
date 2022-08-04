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
                <li className={styles["dropbtn"]}>&#11167;рецепти&#11167;
                    <div className={styles["dropdown-content"]}>
                        <div className={styles['content-holder']}>
                            <NavLink to="/recipe/myRecipes" name="drop-item" className={styles["btn-details-back"]}>моите рецепти</NavLink>
                            <br />
                            <NavLink to="/recipe/add" name="drop-item" className={styles["btn-details-back"]} >добави рецепта</NavLink>
                        </div>
                    </div>
                </li>
                <li>
                    <NavLink to="/recipe/macros" className={focusHandler}>хранителни стойности</NavLink>
                </li>

                <li>
                    <NavLink to="#" name="logout" className={styles["logout-main"]} onClick={(e) => { setIsOpen({ state: true, target: e.target.name }) }}>изход</NavLink>
                </li>
                <li>
                    <NavLink to="/auth/profile" className={useCallback(({ isActive }) => isActive ? styles['profile-name-active'] : "profile-name", [])}> <strong>{email}</strong></NavLink>
                </li>
            </ul>
        </>
    );
}