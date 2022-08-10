import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { logoutSession } from "../../API/api";
import { userLogout } from "../../services/userService";
import styles from "./Logout.module.css"

import { ErrorContext } from "../../contexts/ErrorMessageContext";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";

export const Logout = ({ setIsOpen }) => {

    const { user, cookies, setClientCookie, userHandler } = useContext(LoggedUserContext);
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);

    let navigate = useNavigate();

    const handleLogout = async () => {
        if (user) {
            try {
                await userLogout();
                logoutSession();
                cookies.remove('user-session', { path: "/", maxAge: 48000 });
                setClientCookie(cookies.get('user-session'));
                navigate('/auth/login', { replace: true });
                setIsOpen(false);
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
                !user &&
                <div className={styles["error-container"]}>
                    <p className={styles["error-message"]}>
                        {"Тази операция не може да се изпълни, ако не сте влезли!"}
                        <button className={styles["btn"]} onClick={() => [setErrorMessage(''), navigate('/', { replace: true })]}>OK</button>
                    </p>
                </div>
            }
            {errorMessage
                ? <p className="error-message"> {errorMessage}</p>
                : ""
            }
            <div className={styles["dark-bg"]} onClick={() => setIsOpen(false)} />
            <div className={styles["centered"]}>
                <h1 className={styles["logout-modal-header"]}>Сигурни ли сте, че искате да излезете?</h1>
                <input type="button" className={styles["logout-modal-btn"]} onClick={() => [userHandler(null), handleLogout()]} value="Изход!" />
                <input type="button" className={styles["logout-modal-btn"]} onClick={() => setIsOpen(false)} value="Отказ" />
            </div>
        </>
    );
}