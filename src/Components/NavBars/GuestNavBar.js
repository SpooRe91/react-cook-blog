export const GuestNavBar = () => {

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
                <a href="/auth/register">Регистрация</a>
            </li>
            <li>
                <a href="/auth/login">Вход</a>
            </li>
        </ul>
    );
}