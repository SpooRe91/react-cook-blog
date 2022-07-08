export const Login = () => {

    return (
        <div className="form">
            <h3 className="already-reg">Влизане</h3>
            <form method="POST">
                <label className="already-reg" htmlFor="email">e-mail</label>
                <input type="text" className="email" id="email" name="email" placeholder="e-mail..." required />

                <label className="already-reg" htmlFor="password">парола</label>
                <input type="password" className="password" id="password" name="password" placeholder="парола..." required />

                <input className="already-reg" type="submit" value="Вход" />
            </form>

            <h3 className="already-reg">Нямате регистрация? <a href="/auth/register">Регистрирайте се тук!</a></h3>
        </div>);
}

