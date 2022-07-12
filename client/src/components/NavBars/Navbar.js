import { GuestNavBar } from "./GuestNavBar"
import { UserNavBar } from "./UserNavBar"

export const NavBar = ({ user, setUser, setIsOpen, clientCookie }) => {
    return (
        <nav>
            {user !== null && user.id && clientCookie !== undefined
                ? <UserNavBar {...user} setUser={setUser} setIsOpen={setIsOpen} />
                : <GuestNavBar />
            }
        </nav >);
} 