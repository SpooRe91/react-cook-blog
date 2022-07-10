import { Link } from "react-router-dom";
import { userLogout } from "../../services/userService";
export const UserNavBar = ({ email }) => {
    console.log(email);

    const handleLogout = async () => {
        await userLogout();
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