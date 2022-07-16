import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSession, setSession } from "../../API/api";
import { userLogin } from "../../services/userService";

export const Login = ({ setUser, setErrorMessage, errorMessage, setIsLoading }) => {

    const navigate = useNavigate();

    const [value, setValues] = useState({
        email: '',
        password: ''
    });

    const changeHandler = (e) => {
        setValues(state => ({
            ...state, [e.target.name]: e.target.value
        }));
        setErrorMessage('');
    };

    const loginHandler = (e) => {
        e.preventDefault();

        userLogin(value)
            .then(res => {
                if (res.token) {
                    setSession(res.email, res.token, res.id);
                    setUser(previous => getSession());
                    navigate('/recipe/browse', { replace: true });
                    setIsLoading(false);
                } else {
                    console.log(res.message);
                    setErrorMessage({ error: res.message });
                    throw new Error(res.message);
                }
            });
    };

    useEffect(() => {
        return () => {
            changeHandler();
            setUser(getSession());
            console.log(getSession());
        };
    }, [setUser]);

    return (
        <>
        <title>Вход</title>
            <div className="login-form">
                {errorMessage
                    ? <p className="error-message"> {errorMessage.error}</p>
                    : ""
                }
                <h3 className="already-reg">Вход</h3>
                <form method="POST" onSubmit={loginHandler}>
                    <label className="already-reg" htmlFor="email">e-mail</label>
                    <input type="text" className="email" id="email" name="email" placeholder="e-mail..." required onChange={changeHandler} />

                    <label className="already-reg" htmlFor="password">парола</label>
                    <input type="password" className="password" id="password" name="password" placeholder="парола..." required onChange={changeHandler} />

                    <input className="already-reg" type="submit" value="Вход" />
                </form>

                <h3 className="already-reg">Нямате регистрация? <Link to="/auth/register">Регистрирайте се тук!</Link></h3>
            </div >
        </>
    );

};
