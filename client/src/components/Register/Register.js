export const Register = () => {

    return (
        <div className="form">
            <h3 className="already-reg">Регистрация</h3>
            <form method="POST">
                <label className="already-reg" htmlFor="email">e-mail</label>
                <input type="text" className="email" name="email" placeholder="e-mail..." required />

                <label className="already-reg" htmlFor="password">парола</label>
                <input type="password" className="password" name="password" placeholder="парола..." required />

                <label className="already-reg" htmlFor="rePassword">повторете паролата</label>
                <input type="password" className="rePassword" name="rePassword" placeholder="повторете паролата..." required />

                <input className="already-reg" type="submit" value="Регистриране" />
            </form>
            <h3 className="already-reg">Вече сте регистрирани?<a href="/auth/login">Влезте от тук!</a></h3>
        </div>);
}