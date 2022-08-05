
import { Link } from "react-router-dom";
import { useCallback, useContext } from 'react';

import { GuestNavBar } from "./GuestNavBar";
import { UserNavBar } from "./UserNavBar";
import logo from './logo.jpg';
import styles from "./NavBar.module.css"
import { LoggedUserContext } from "../../contexts/LoggedUserContext";


export const NavBar = ({ setIsOpen }) => {

    const { ...props } = useContext(LoggedUserContext);
    const focusHandler = useCallback(({ isActive }) => isActive ? styles['active-element'] : "", []);

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/"><img className={styles["nav-logo"]} src={logo} alt="#" /></Link>
                </li>
            </ul>
            {props.user?.token && props.clientCookie !== null
                ? <UserNavBar {...props.user} setUser={props.userHandler} setIsOpen={setIsOpen} focusHandler={focusHandler} />
                : <GuestNavBar focusHandler={focusHandler} />
            }
        </nav >);

}