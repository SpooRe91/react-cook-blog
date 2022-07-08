
import { GuestNavBar } from "./GuestNavBar"
import { UserNavBar } from "./UserNavBar"

export const NavBar = (props) => {

    return (
        <nav>
            {props.id !== undefined && props.id !== null
                ? <UserNavBar key={props.id} {...props} />
                : <GuestNavBar />
            }
        </nav >);
} 