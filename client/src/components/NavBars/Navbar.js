import { GuestNavBar } from "./GuestNavBar"
import { UserNavBar } from "./UserNavBar"

export const NavBar = ({ user, setUser, setIsOpen }) => {
    console.log({ user });

    return (
        <nav>
            {user !== null && user.id
                ? <UserNavBar {...user} setUser={setUser} setIsOpen={setIsOpen} />
                : <GuestNavBar />
            }
        </nav >);
} 