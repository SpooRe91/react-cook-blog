import { Link, useNavigate } from "react-router-dom";
import { logoutSession } from "../../API/api";
import { userLogout } from "../../services/userService";
export const UserNavBar = ({ email, setUser }) => {
    console.log(email);

    let navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await userLogout();
            logoutSession();
            navigate('/auth/login')
        } catch (error) {
            navigate('/404', { error: error.message })
        }
    }

    return (
        <ul>
            <li>
                <Link to="/">Начало</Link>
            </li>
            <li>
                <Link to="/recipe/browse">Търсене на рецепти</Link>
            </li>
            <li>
                <Link to="/recipe/add">Добави рецепта</Link>
            </li>
            <li>
                <Link to="/recipe/myRecipes">Моите рецепти</Link>
            </li>
            <li>
                <Link to="/auth/profile" className="profile-name"><strong>{email}</strong></Link>
            </li>
            <li>
                <Link to="/" onClick={() => setUser(handleLogout)} >Изход</Link>
            </li>
        </ul>
    );
}