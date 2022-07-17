import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSession, setSession } from "../../API/api";
import { userRegister } from "../../services/userService";

export const Register = ({ setUser, setErrorMessage, errorMessage, setIsLoading }) => {

    let navigate = useNavigate();

    const [value, setValues] = useState({
        email: '',
        password: '',
        rePassword: ''
    });

    const changeHandler = (e) => {
        setValues(state => ({
            ...state, [e.target.name]: e.target.value
        }));
        setErrorMessage('');
    };

    const registerHandler = (e) => {
        e.preventDefault();

        userRegister(value)
            .then(res => {
                console.log(res);
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
    }

    useEffect(() => {
        console.log(getSession());
        return () => {
            changeHandler();
            setUser(getSession());
            console.log(getSession());
        }
    }, []);

    return (
        <>
    <title>Регистрация</title>

            <div className="register-form">
                {errorMessage
                    ? <p className="error-message"> {errorMessage.error}</p>
                    : ""
                }
                <h3 className="already-reg">Регистрация</h3>
                <form method="POST" onSubmit={registerHandler}>
                    <label className="already-reg" htmlFor="email">e-mail</label>
                    <input type="text" className="email" name="email" placeholder="e-mail..." required onChange={changeHandler} />

                    <label className="already-reg" htmlFor="password">парола</label>
                    <input type="password" className="password" name="password" placeholder="парола..." required onChange={changeHandler} />

                    <label className="already-reg" htmlFor="rePassword">повторете паролата</label>
                    <input type="password" className="rePassword" name="rePassword" placeholder="повторете паролата..." required onChange={changeHandler} />

                    <input className="already-reg" type="submit" value="Регистриране" />
                </form>
                <h3 className="already-reg">Вече сте регистрирани?<Link to="/auth/login">Влезте от тук!</Link></h3>
            </div>
        </>
    );
}