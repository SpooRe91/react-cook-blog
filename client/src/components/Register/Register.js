import { useState } from "react";
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
    const errorHandler = () => setErrorMessage('');
    
    const changeHandler = (e) => {
        setValues(state => ({
            ...state, [e.target.name]: e.target.value
        }));
    }

    const registerHandler = (e) => {
        e.preventDefault();

        userRegister(value)
            .then(res => {
                console.log(res);
                if (res.token) {
                    setSession(res.email, res.token, res.id);
                    setUser(previous => getSession());
                    navigate('/recipe/browse');
                    setIsLoading(false);
                } else {
                    console.log(res.message);
                    setErrorMessage({ error: res.message });
                    throw new Error(res.message);
                }
            });
    }

    return (
        <div className="register-form">
            <h3 style={{ color: "red" }}> {errorMessage && errorMessage.error}</h3>
            <h3 className="already-reg">Регистрация</h3>
            <form method="POST" onSubmit={registerHandler}>
                <label className="already-reg" htmlFor="email">e-mail</label>
                <input type="text" className="email" name="email" placeholder="e-mail..." required onChange={(changeHandler, errorHandler)} />

                <label className="already-reg" htmlFor="password">парола</label>
                <input type="password" className="password" name="password" placeholder="парола..." required onChange={(changeHandler, errorHandler)} />

                <label className="already-reg" htmlFor="rePassword">повторете паролата</label>
                <input type="password" className="rePassword" name="rePassword" placeholder="повторете паролата..." required onChange={(changeHandler, errorHandler)} />

                <input className="already-reg" type="submit" value="Регистриране" />
            </form>
            <h3 className="already-reg">Вече сте регистрирани?<Link to="/auth/login">Влезте от тук!</Link></h3>
        </div>);
}