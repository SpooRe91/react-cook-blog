import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { logoutSession, getSession } from "../../API/api";
import { userLogout } from "../../services/userService";
import styles from "./Logout.module.css"

import { ErrorContext } from "../../contexts/ErrorMessageContext";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";
import LoadingComponent from "../common/LoadingComponent";

export const Logout = ({ isLoading, setIsLoading, setIsOpen }) => {

    const { user, cookies, userHandler } = useContext(LoggedUserContext);
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);

    let navigate = useNavigate();

    useEffect(() => {
        return () => {
            setErrorMessage('');
        }
    }, [setErrorMessage])

    const handleLogout = async () => {
        if (user) {
            setIsLoading(state => true);
            try {
                await userLogout();
                setIsOpen(false);
                logoutSession();
                cookies.remove('user-session', { path: "/", maxAge: 48000 });
                navigate('/auth/login', { replace: true });
                setIsLoading(state => false);
            } catch (error) {
                console.log(error.message);
                setErrorMessage(error.message);
                navigate('/404', { replace: true });
            }
        } else {
            setErrorMessage("Първо трябва да влезете!");
        }
    }

    return (
        <>
            <title>Изход</title>
            {
                !user
                    ?
                    !getSession()
                        ?
                        <div div className={styles["error-container"]}>
                            <p className={styles["error-message"]}>
                                {"Тази операция не може да се изпълни, ако не сте влезли!"}
                                <button className={styles["btn"]} onClick={() => [setErrorMessage(''), navigate('/', { replace: true })]}>OK</button>
                            </p>
                        </div>
                        : null
                    : null
            }
            {
                errorMessage
                    ? <p className="error-message"> {errorMessage}</p>
                    : ""
            }

            <div className={styles["dark-bg"]} onClick={() => setIsOpen(false)} />
            <div className={styles["centered"]}>
                {isLoading
                    ?
                    <LoadingComponent {...{ isLoading }} />
                    :
                    <>
                        <h1 className={styles["logout-modal-header"]}>Сигурни ли сте, че искате да излезете?</h1>
                        <input type="button" className={styles["logout-modal-btn"]} onClick={() => [userHandler(null), handleLogout()]} value="Изход!" />
                        <input type="button" className={styles["logout-modal-btn"]} onClick={() => setIsOpen(false)} value="Отказ" />
                    </>
                }
            </div>
        </>
    );
}