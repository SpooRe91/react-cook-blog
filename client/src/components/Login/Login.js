import { useState } from "react";
import { userLogin } from "../../services/userService";

export const Login = () => {

    const [user, setUser] = useState({});

    const onLoginHandler = (e) => {

        e.preventDefault();

        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);

        
        userLogin({ email, password })
            .then(res => {
                console.log(res);
                setUser(res)
            });
        return user;
    };

    return (
        <div className="form">
            <h3 className="already-reg">Влизане</h3>
            <form method="POST" onSubmit={onLoginHandler}>
                <label className="already-reg" htmlFor="email">e-mail</label>
                <input type="text" className="email" id="email" name="email" placeholder="e-mail..." required />

                <label className="already-reg" htmlFor="password">парола</label>
                <input type="password" className="password" id="password" name="password" placeholder="парола..." required />

                <input className="already-reg" type="submit" value="Вход" />
            </form>

            <h3 className="already-reg">Нямате регистрация? <a href="/auth/register">Регистрирайте се тук!</a></h3>
        </div>);
}

