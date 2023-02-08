import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//-------------------------------------------------------------------------------------------------
import styles from "./Login.module.css";
import { userLogin } from "../../services/userService";
import { getSession, setSession } from "../../API/api";
//-------------------------------------------------------------------------------------------------
import { LoggedUserContext } from "../../contexts/LoggedUserContext";
import { ErrorContext } from "../../contexts/ErrorMessageContext";
import { BeatLoader } from "react-spinners";

export const Login = ({ isLoading, setIsLoading }) => {

    //-------------------------------------------------------------------------------------------------
    const { userHandler, cookies } = useContext(LoggedUserContext);
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);
    const navigate = useNavigate();

    const [value, setValues] = useState({
        email: '',
        password: ''
    });
    //-------------------------------------------------------------------------------------------------
    const changeHandler = (e) => {
        setValues(state => ({
            ...state, [e.target.name]: e.target.value
        }));
        setErrorMessage('');
    };
    //-------------------------------------------------------------------------------------------------
    const loginHandler = (e) => {
        e.preventDefault();
        setIsLoading(state => true);
        userLogin(value)
            .then(res => {
                if (res.token) {
                    setSession({ ...res });
                    userHandler(getSession());
                    cookies.set('user-session', getSession(), { path: "/", maxAge: 48000 });
                    navigate('/recipe/browse', { replace: true });
                    setIsLoading(state => false);
                }
                if (res.message) throw new Error(res.message);
            })
            .catch(error => {
                return setErrorMessage(error.message)
            })
    };

    //-------------------------------------------------------------------------------------------------
    useEffect(() => {
        return () => {
            setErrorMessage('');
            userHandler(getSession());
        };
    }, [setIsLoading, setErrorMessage, userHandler]);
    //-------------------------------------------------------------------------------------------------

    return (
        <>
            <title>Вход</title>
            {isLoading ? "LOADING..." : null}
            <div>
                <>
                    {errorMessage !== '' && <p>Грешка</p>}
                    {errorMessage !== "" &&
                        <div className={styles["error-container"]}>
                            <p className={styles["error-message"]}>
                                {errorMessage}
                                <button className={styles["btn"]} onClick={() => [setErrorMessage(''), setIsLoading(state => false)]}>
                                    OK
                                </button>
                            </p>
                        </div>
                    }
                    {isLoading
                        ?
                        <>
                            <div className={styles["already-reg-loading"]}>
                                <h3 className={styles["already-reg"]}>Вход</h3>
                                <BeatLoader loading={() => isLoading} color={"white"} />
                                <p>Моля изчакайте...</p>
                            </div>
                        </>
                        :
                        <>
                            <form className={styles["login-form"]} method="POST" onSubmit={loginHandler}>
                                <h3 className={styles["already-reg"]}>Вход</h3>
                                <label className={styles["credentials"]} htmlFor="email">e-mail</label>
                                <input type="text" className={styles["email"]} id="email" name="email"
                                    placeholder="e-mail..." required onChange={changeHandler} value={value.email} />

                                <label className={styles["credentials"]} htmlFor="password">парола</label>
                                <input type="password" className={styles["password"]} id="password" name="password"
                                    placeholder="парола..." required onChange={changeHandler} value={value.password} />

                                <input className={styles["already-reg"]} type="submit" value="Вход" />
                                <h3 className={styles["already-reg"]}>Нямате регистрация? <Link to="/auth/register">Регистрирайте се тук!</Link></h3>
                            </form>
                        </>
                    }
                </>
            </div>
        </>
    );

};
