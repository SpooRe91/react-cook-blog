import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export const UserNavBar = ({ id, email, setIsOpen, focusHandler, isMobile }) => {
    return (
        <div>
            <ul className={styles[!isMobile ? "nav-list" : "nav-list-mobile"]}>
                <li>
                    <NavLink to="/" className={focusHandler}>
                        Начало
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/recipe/browse" className={focusHandler}>
                        търсене на рецепти
                    </NavLink>
                </li>
                <li className={styles["dropbtn"]}>
                    &#11167;рецепти&#11167;
                    <div className={styles["dropdown-content"]}>
                        <div className={styles["content-holder"]}>
                            <NavLink
                                to="/recipe/myRecipes"
                                name="drop-item"
                                className={styles["btn-details-back"]}
                            >
                                моите рецепти
                            </NavLink>
                            <NavLink to="/recipe/add" name="drop-item" className={styles["btn-details-back"]}>
                                добави рецепта
                            </NavLink>
                        </div>
                    </div>
                </li>
                <li>
                    <NavLink to="/recipe/macros" className={focusHandler}>
                        хранителни стойности
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="#"
                        name="logout"
                        className={styles["logout-main"]}
                        onClick={(e) => {
                            setIsOpen({ state: true, target: e.target.name });
                        }}
                    >
                        изход
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={`/auth/profile/${id}`}
                        className={useCallback(
                            ({ isActive }) => (isActive ? styles["profile-name-active"] : "profile-name"),
                            []
                        )}
                    >
                        {" "}
                        <strong>{email}</strong>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};
