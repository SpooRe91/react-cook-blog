import { Link, useNavigate } from "react-router-dom";
import { logoutSession } from "../../API/api";
import { userLogout } from "../../services/userService";
export const UserNavBar = ({ email }) => {
    console.log(email);
//TODO MAYBE THIS SHOULD NOT BE HERE, EXP UPDATE
    let navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await userLogout();
            logoutSession();
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
                <Link to="/auth/logout" onClick={handleLogout}>Изход</Link>
            </li>
        </ul>
    );
}