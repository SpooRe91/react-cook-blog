import { GuestNavBar } from "./GuestNavBar"
import { UserNavBar } from "./UserNavBar"

export const NavBar = ({ user }) => {
    console.log({ user });

    return (
        <nav>
            {user.id !== undefined && user.id !== null
                ? <UserNavBar key={user.id} {...user}/>
                : <GuestNavBar />
            }
        </nav >);
} 