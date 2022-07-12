import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSession, setSession } from "../../API/api";
import { userLogin } from "../../services/userService";

export const Login = ({ setUser, setErrorMessage, setIsLoading }) => {

    const navigate = useNavigate();
    console.log();

    const [value, setValues] = useState({
        email: '',
        password: ''
    });


    const changeHandler = (e) => {
        setValues(state => ({
            ...state, [e.target.name]: e.target.value
        }));
    }

    const loginHandler = (e) => {
        e.preventDefault();

        userLogin(value)
            .then(res => {
                if (res.token) {
                    setSession(res.email, res.token, res.id);
                    setUser(previous => getSession());
                    navigate('/recipe/browse');
                    setIsLoading(false);
                } else {
                    setErrorMessage({ error: "Username or password don't match!" });
                    throw new Error("Username or password don't match!");
                }
            });
    };

    return (
        <div className="login-form">
            <h3 className="already-reg">Влизане</h3>
            <form method="POST" onSubmit={loginHandler}>
                <label className="already-reg" htmlFor="email">e-mail</label>
                <input type="text" className="email" id="email" name="email" placeholder="e-mail..." required onChange={changeHandler} />

                <label className="already-reg" htmlFor="password">парола</label>
                <input type="password" className="password" id="password" name="password" placeholder="парола..." required onChange={changeHandler} />

                <input className="already-reg" type="submit" value="Вход" />
            </form>

            <h3 className="already-reg">Нямате регистрация? <a href="/auth/register">Регистрирайте се тук!</a></h3>
        </div>

    );
}

