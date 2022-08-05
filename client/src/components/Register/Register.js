import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSession, setSession } from "../../API/api";
import { userRegister } from "../../services/userService";

import { ErrorContext } from "../../contexts/ErrorMessageContext";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";

import styles from "./Register.module.css";

export const Register = ({ setIsLoading }) => {
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);
    const { ...props } = useContext(LoggedUserContext);

    let navigate = useNavigate();

    const [value, setValues] = useState({
        email: '',
        password: '',
        rePassword: '',
        image: "",
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
                if (res.id) {
                    setSession({ ...res });
                    props.userHandler(getSession());
                    navigate('/recipe/browse');
                    setIsLoading(false);
                } else {
                    console.log(res.message);
                    setErrorMessage({ error: res.message });
                    throw new Error(res.message);
                }
                if (res.message) throw new Error(res.message);
            });
    }

    //USE EFFECT, ON UNMOUNT TO ACTIVATE THE CHANGEHANDLER, WHICH WILL REMOVE ANY ERROR ELEMENTS
    //AND SETS THE USER IN LOCAL AND SESSION STORAGE AS PER WHATEVER IS SET BEFOREHAND
    useEffect(() => {
        return (props) => {
            setErrorMessage('');
            props.userHandler(getSession());
        }
    }, [setErrorMessage]);

    //--------------------------------------------------------------------------------------
    return (
        <>
            <title>Регистрация</title>

            <div>
                {errorMessage !== "" &&
                    <div className={styles["error-container"]}>
                        <p className={styles["error-message"]}>
                            {errorMessage.error}
                            <button className={styles["btn"]} onClick={() => setErrorMessage('')}>OK</button>
                        </p>
                    </div>
                }
                <>
                    {
                        props.user?.token
                            ?
                            <div className={styles["error-container"]}>
                                <p className={styles["error-message"]}>
                                    {"Вече сте влезли!"}
                                    <button className={styles["btn"]} onClick={() => [setErrorMessage(''), navigate('/')]}>
                                        OK
                                    </button>
                                </p>
                            </div>
                            :
                            <>
                                <h3 className={styles["already-reg"]}>Регистрация</h3>
                                <form method="POST" onSubmit={registerHandler} className={styles["register-form"]}>
                                    <label className={styles["credentials"]} htmlFor="email">e-mail</label>
                                    <input type="text" className={styles["email"]} id="email" name="email"
                                        placeholder="e-mail..." required onChange={changeHandler} value={value.email} />

                                    <label className={styles["credentials"]} htmlFor="password">парола</label>
                                    <input type="password" className={styles["password"]} id="password" name="password"
                                        placeholder="парола..." required onChange={changeHandler} value={value.password} />

                                    <label className={styles["credentials"]} htmlFor="rePassword">повторете паролата</label>
                                    <input type="password" className={styles["rePassword"]} id="rePassword" name="rePassword"
                                        placeholder="повторете паролата..." required onChange={changeHandler} value={value.rePassword} />

                                    <input className={styles["already-reg"]} type="submit" value="Регистриране" />
                                </form>
                                <h3 className={styles["already-reg"]}>Вече сте регистрирани?<Link to="/auth/login" className={styles["already-reg"]}>Влезте от тук!</Link></h3>
                            </>
                    }
                </>
            </div>
        </>
    );
}