import { Link } from "react-router-dom";
export const UserNavBar = ({ email, setUser, setIsOpen }) => {
    console.log(email);


    return (
        <>
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
                    <Link to="#" name="logout" onClick={(e) => { setIsOpen({ state: true, target: e.target.name }) }}>Изход</Link>
                </li>
                <li>
                    <Link to="/auth/profile" className="profile-name"><strong>{email}</strong></Link>
                </li>
            </ul>
        </>
    );
}