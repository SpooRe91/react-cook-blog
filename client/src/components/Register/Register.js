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
    //--------EVENT HANDLER FOR THE CHANGE IN INPUT FIELDS AND REMOVING THE ERROR STATE------
    const changeHandler = (e) => {
        setValues(state => ({
            ...state, [e.target.name]: e.target.value
        }));
        setErrorMessage('');
    };
    //REGISTER HANDLER - HANDLES THE REGISTRATION REQUEST AND SETS THE REGISTERED USER-------
    const registerHandler = (e) => {
        e.preventDefault();

        userRegister(value)
            .then(res => {
                console.log(res);
                if (res.token) {
                    setSession({ ...res });
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
    //USE EFFECT, ON UNMOUNT TO ACTIVATE THE CHANGEHANDLER, WHICH WILL REMOVE ANY ERROR ELEMENTS
    //AND SETS THE USER IN LOCAL AND SESSION STORAGE AS PER WHATEVER IS SET BEFOREHAND

    useEffect(() => {
        return () => {
            changeHandler();
            // setUser(getSession());
        }
    }, []);
    //--------------------------------------------------------------------------------------
    return (
        <>
            <title>Регистрация</title>

            <div>
                {errorMessage
                    ? <p className="error-message"> {errorMessage.error}</p>
                    : ""
                }
                <h3 className="already-reg">Регистрация</h3>
                <form method="POST" onSubmit={registerHandler} className="register-form">
                    <label className="credentials" htmlFor="email">e-mail</label>
                    <input type="text" className="email" id="email" name="email"
                        placeholder="e-mail..." required onChange={changeHandler} value={value.email} />

                    <label className="credentials" htmlFor="password">парола</label>
                    <input type="password" className="password" id="password" name="password"
                        placeholder="парола..." required onChange={changeHandler} value={value.password} />

                    <label className="credentials" htmlFor="rePassword">повторете паролата</label>
                    <input type="password" className="rePassword" id="rePassword" name="rePassword"
                        placeholder="повторете паролата..." required onChange={changeHandler} value={value.rePassword} />

                    <input className="already-reg" type="submit" value="Регистриране" />
                </form>
                <h3 className="already-reg">Вече сте регистрирани?<Link to="/auth/login">Влезте от тук!</Link></h3>
            </div>
        </>
    );
}