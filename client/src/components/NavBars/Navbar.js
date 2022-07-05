import { GuestNavBar } from "./GuestNavBar"
import { UserNavBar } from "./UserNavBar"

export const NavBar = (props) => {

    return (
        <nav>
            {props.user !== undefined && props.user !== null
                ? <UserNavBar user={props.user} />
                : <GuestNavBar />
            }
        </nav >);
} 