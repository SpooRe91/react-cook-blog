export const UserNavBar = (props) => {

    return (
        <ul>
            <li>
                <a href="/">Начало</a>
            </li>
            <li>
                <a href="/recipe/browse">Търсене на рецепти</a>
            </li>
            <li>
                <a href="/about">Относно</a>
            </li>
            <li>
                <a href="/contacts">Контакти</a>
            </li>
            <li>
                <a href="/recipe/add">Добави рецепта</a>
            </li>
            <li>
                <a href="/recipe/myRecipes">Моите рецепти</a>
            </li>
            <li>
                <a className="profile-name" href="/recipe/myRecipes"><strong>{props.user.name}</strong></a>
            </li>
            <li>
                <a href="/auth/login">Изход</a>
            </li>
        </ul>
    );
}