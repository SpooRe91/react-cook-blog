import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSession, setSession } from "../../API/api";
import { userLogin } from "../../services/userService";

import { LoggedUserContext } from "../../contexts/LoggedUserContext";
import { ErrorContext } from "../../contexts/ErrorMessageContext";

export const Login = ({ setUser, setIsLoading }) => {

    const user = useContext(LoggedUserContext);
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);
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
                console.log(res);
                if (res.id) {
                    setSession({ ...res });
                    setUser(previous => getSession());
                    navigate('/recipe/browse', { replace: true });
                    setIsLoading(false);
                }
                if (res.message) throw new Error(res.message);
            })
            .catch(error => {
                return setErrorMessage({ error: error.message })
            })
    };
    console.log(errorMessage);

    useEffect(() => {
        return () => {
            setErrorMessage('');
            setUser(getSession());
            console.log(getSession());
        };
    }, [setErrorMessage, setUser]);

    return (
        <>
            <title>Вход</title>
            <div>
                {errorMessage !== "" &&
                    <div className="error-container">
                        <p className="error-message">
                            {errorMessage.error}
                            <button className="btn" onClick={() => setErrorMessage('')}>
                                OK
                            </button>
                        </p>
                    </div>
                }
                <>
                    {
                        user ?
                            <div className="error-container">
                                <p className="error-message">
                                    {"Вече сте влезли!"}
                                    <button className="btn" onClick={() => [setErrorMessage(''), navigate('/')]}>OK</button>
                                </p>
                            </div>
                            :
                            <>
                                <h3 className="already-reg">Вход</h3>
                                <form className="login-form" method="POST" onSubmit={loginHandler}>
                                    <label className="credentials" htmlFor="email">e-mail</label>
                                    <input type="text" className="email" id="email" name="email"
                                        placeholder="e-mail..." required onChange={changeHandler} value={value.email} />

                                    <label className="credentials" htmlFor="password">парола</label>
                                    <input type="password" className="password" id="password" name="password"
                                        placeholder="парола..." required onChange={changeHandler} value={value.password} />

                                    <input className="already-reg" type="submit" value="Вход" />
                                </form>

                                <h3 className="already-reg">Нямате регистрация? <Link to="/auth/register">Регистрирайте се тук!</Link></h3>
                            </>
                    }
                </>
            </div >
        </>
    );

};
