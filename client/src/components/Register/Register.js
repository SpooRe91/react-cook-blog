export const Register = () => {

    return (
        <div className="form">
            <form method="POST">
                <label className="already-reg" htmlFor="email">e-mail</label>
                <input type="text" name="email" placeholder="e-mail..." required />

                <label className="already-reg" htmlFor="password">парола</label>
                <input type="password" name="password" placeholder="парола..." required />

                <label className="already-reg" htmlFor="rePassword">повторете паролата</label>
                <input type="password" name="rePassword" placeholder="повторете паролата..." required />

                <input className="already-reg" type="submit" value="Регистриране" />
            </form>
            <h3 className="already-reg">Вече сте регистрирани? Влезте от <a href="/auth/login">TУК</a></h3>
        </div>);
}