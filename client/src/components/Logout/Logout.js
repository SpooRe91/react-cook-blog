import { useNavigate } from "react-router-dom";
import { logoutSession } from "../../API/api";
import { userLogout } from "../../services/userService";
import styles from "./Logout.module.css"
import { useContext } from "react";

import { ErrorContext } from "../../contexts/ErrorMessageContext";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";

export const Logout = ({ setIsOpen, cookies }) => {

    const { user, setUser } = useContext(LoggedUserContext);
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);

    let navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await userLogout();
            logoutSession();
            cookies.remove('user-session', user, { path: "/", maxAge: 48000 });
            navigate('/auth/login', { replace: true });
            setIsOpen(false);
        } catch (error) {
            console.log(error.message);
            setErrorMessage({ error: error.message });
            navigate('/404');
        }
    }


    return (
        <>
            <title>Изход</title>
            {
                !user &&
                <div className="error-container">
                    <p className="error-message">
                        {"Тази операция не може да се изпълни, ако не сте влезли!"}
                        <button className="btn" onClick={() => [setErrorMessage(''), navigate('/')]}>OK</button>
                    </p>
                </div>
            }
            {errorMessage
                ? <p className="error-message"> {errorMessage.error}</p>
                : ""
            }
            <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
            <div className={styles.centered}>
                <h1 className={styles.logoutModalHeader}>Сигурни ли сте, че искате да излезете?</h1>
                <input type="button" className={styles.logoutModalBtn} onClick={() => [setUser(null), handleLogout()]} value="Изход!" />
                <input type="button" className={styles.logoutModalBtn} onClick={() => setIsOpen(false)} value="Отказ" />
            </div>
        </>
    );
}