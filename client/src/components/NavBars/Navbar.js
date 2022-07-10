import { GuestNavBar } from "./GuestNavBar"
import { UserNavBar } from "./UserNavBar"

export const NavBar = ({ user, setUser }) => {
    console.log({ user });

    return (
        <nav>
            {user !== null && user.id
                ? <UserNavBar {...user} setUser={setUser} />
                : <GuestNavBar />
            }
        </nav >);
} 