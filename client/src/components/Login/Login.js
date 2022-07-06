export const Login = () => {

    return (<div className="form">
        <form method="POST">

            <label className="already-reg" htmlFor="email">e-mail</label>
            <input type="text" id="email" name="email" placeholder="e-mail..." required />

            <label className="already-reg" htmlFor="password">парола</label>
            <input type="password" id="password" name="password" placeholder="парола..." required />

            <input className="already-reg" type="submit" value="Вход" />
        </form>
        
            <h3 className="already-reg">Нямате регистрация? <a href="/auth/register">Регистрирайте се тук!</a></h3>
    </div>);
}

