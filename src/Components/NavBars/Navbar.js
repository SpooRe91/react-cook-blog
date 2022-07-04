import { GuestNavBar } from "../NavBars/GuestNavBar"
import { UserNavBar } from "../NavBars/UserNavBar"

export const NavBar = (props) => {

    return (
        <nav>
            {props.user !== undefined && props.user !== null
                ? <UserNavBar user={props.user} />
                : <GuestNavBar />
            }
        </nav >);
} 