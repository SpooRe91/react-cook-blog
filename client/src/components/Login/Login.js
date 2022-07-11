import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSession, setSession } from "../../API/api";
import { userLogin } from "../../services/userService";

export const Login = ({ setUser, setErrorMessage }) => {

    const navigate = useNavigate();

    const loginHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);

        userLogin({ email, password })
            .then(res => {
                console.log(res);
                if (res.token) {
                    setSession(res.email, res.token, res.id);
                    navigate('/recipe/browse');
                    return setUser(getSession());
                } else {
                    setErrorMessage({ error: "Username or password don't match!" });
                    throw new Error("Username or password don't match!");
                }
            });
    };

    return (
        <div className="form">
            <h3 className="already-reg">Влизане</h3>
            <form method="POST" onSubmit={loginHandler}>
                <label className="already-reg" htmlFor="email">e-mail</label>
                <input type="text" className="email" id="email" name="email" placeholder="e-mail..." required />

                <label className="already-reg" htmlFor="password">парола</label>
                <input type="password" className="password" id="password" name="password" placeholder="парола..." required />

                <input className="already-reg" type="submit" value="Вход" />
            </form>

            <h3 className="already-reg">Нямате регистрация? <a href="/auth/register">Регистрирайте се тук!</a></h3>
        </div>

    );
}

