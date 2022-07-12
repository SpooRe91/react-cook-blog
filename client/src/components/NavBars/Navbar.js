
import { GuestNavBar } from "./GuestNavBar";
import { UserNavBar } from "./UserNavBar";
import logo from './logo.jpg';
import { Link } from "react-router-dom";


export const NavBar = ({ user, setUser, setIsOpen, clientCookie }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/"><img className="nav-logo" src={logo} alt="#" /></Link>
                </li>
            </ul>
            {user !== null && user.id && clientCookie !== undefined
                ? <UserNavBar {...user} setUser={setUser} setIsOpen={setIsOpen} />
                : <GuestNavBar />
            }
        </nav >);
} 