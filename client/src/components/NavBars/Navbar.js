import { Link } from "react-router-dom";
import { useCallback, useContext } from "react";

import { GuestNavBar } from "./GuestNavBar";
import { UserNavBar } from "./UserNavBar";
import logo from "./logo.jpg";
import styles from "./NavBar.module.css";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";
import useGetAgentView from "../../hooks/useGetAgentView";

export const NavBar = ({ setIsOpen }) => {
    const { user, clientCookie, userHandler } = useContext(LoggedUserContext);
    const focusHandler = useCallback(({ isActive }) => (isActive ? styles["active-element"] : ""), []);

    const { isMobile, isBelowMidScreenSize } = useGetAgentView();

    return (
        <nav className={!isMobile ? "nav" : "nav-mobile"}>
            {!isMobile &&
                (!isBelowMidScreenSize && (
                    <div className={styles["logo-container"]}>
                        <Link className={styles["logo-link"]} to="/">
                            <img className={styles["nav-logo"]} src={logo} alt="#" />
                        </Link>
                    </div>
                ))}

            {user?.token && clientCookie !== null ? (
                <UserNavBar
                    {...user}
                    setUser={userHandler}
                    setIsOpen={setIsOpen}
                    focusHandler={focusHandler}
                    isMobile={isMobile}
                />
            ) : (
                <GuestNavBar focusHandler={focusHandler} isMobile={isMobile} />
            )}
        </nav>
    );
};
