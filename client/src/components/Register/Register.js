import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSession, setSession } from "../../API/api";
import { userRegister } from "../../services/userService";

import { ErrorContext } from "../../contexts/ErrorMessageContext";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";

import styles from "./Register.module.css";
import LoadingComponent from "../common/LoadingComponent";

export const Register = ({ isLoading, setIsLoading }) => {
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);
    const { userHandler } = useContext(LoggedUserContext);

    let navigate = useNavigate();

    const [value, setValues] = useState({
        email: "",
        password: "",
        rePassword: "",
        image: "",
    });

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
        setErrorMessage("");
    };

    const registerHandler = (e) => {
        e.preventDefault();
        setIsLoading((state) => true);
        userRegister(value)
            .then((res) => {
                console.log(res);
                if (res.id) {
                    setSession({ ...res });
                    userHandler(getSession());
                    navigate("/recipe/browse", { replace: true });
                }
                if (res.message) throw new Error(res.message);
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    };

    useEffect(() => {
        return () => {
            setErrorMessage("");
            userHandler(getSession());
        };
    }, [setErrorMessage, userHandler]);

    return (
        <>
            <title>Регистрация</title>

            <div>
                {errorMessage !== "" && <p>Грешка</p>}
                {errorMessage !== "" && (
                    <div className={styles["error-container"]}>
                        <p className={styles["error-message"]}>
                            {errorMessage}
                            <button
                                className={styles["btn"]}
                                onClick={() => [setErrorMessage(""), setIsLoading((state) => false)]}
                            >
                                OK
                            </button>
                        </p>
                    </div>
                )}
                {isLoading ? (
                    <LoadingComponent {...{ isLoading }} />
                ) : (
                    <>
                        <form method="POST" onSubmit={registerHandler} className={styles["register-form"]}>
                            <div>
                                <h3 className={styles["already-reg"]}>Регистрация</h3>
                            </div>
                            <label className={styles["credentials"]} htmlFor="email">
                                e-mail
                            </label>
                            <input
                                type="text"
                                className={styles["email"]}
                                id="email"
                                name="email"
                                placeholder="e-mail..."
                                required
                                onChange={changeHandler}
                                value={value.email}
                            />

                            <label className={styles["credentials"]} htmlFor="password">
                                парола
                            </label>
                            <input
                                type="password"
                                className={styles["password"]}
                                id="password"
                                name="password"
                                placeholder="парола..."
                                required
                                onChange={changeHandler}
                                value={value.password}
                            />

                            <label className={styles["credentials"]} htmlFor="rePassword">
                                повторете паролата
                            </label>
                            <input
                                type="password"
                                className={styles["rePassword"]}
                                id="rePassword"
                                name="rePassword"
                                placeholder="повторете паролата..."
                                required
                                onChange={changeHandler}
                                value={value.rePassword}
                            />

                            <input className={styles["already-reg"]} type="submit" value="Регистриране" />
                            <h3 className={styles["already-reg"]}>
                                Вече сте регистрирани?
                                <Link to="/auth/login" className={styles["already-reg"]}>
                                    Влезте от тук!
                                </Link>
                            </h3>
                        </form>
                    </>
                )}
            </div>
        </>
    );
};
