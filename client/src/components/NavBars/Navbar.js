
import { GuestNavBar } from "./GuestNavBar";
import { UserNavBar } from "./UserNavBar";
import logo from './logo.jpg';
import { Link } from "react-router-dom";
import { useCallback } from 'react';
import styles from "./NavBar.module.css"


export const NavBar = ({ user, setUser, setIsOpen, clientCookie }) => {

    const focusHandler = useCallback(({ isActive }) => isActive ? styles['active-element'] : "", []);

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/"><img className="nav-logo" src={logo} alt="#" /></Link>
                </li>
            </ul>
            {user !== null && user.id && clientCookie !== undefined
                ? <UserNavBar {...user} setUser={setUser} setIsOpen={setIsOpen} focusHandler={focusHandler} />
                : <GuestNavBar focusHandler={focusHandler} />
            }
        </nav >);

}