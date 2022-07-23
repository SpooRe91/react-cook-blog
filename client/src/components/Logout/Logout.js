import { useNavigate } from "react-router-dom";
import { logoutSession } from "../../API/api";
import { userLogout } from "../../services/userService";
import styles from "./Logout.module.css"
import { ErrorContext } from "../../contexts/ErrorMessageContext";
import { useContext } from "react";

export const Logout = ({ setIsOpen, setUser, cookies, user }) => {
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);

    let navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await userLogout();
            logoutSession();
            cookies.remove('user-session', user.token, { path: "/", maxAge: 36000 });
            setIsOpen(false);
            return navigate('/auth/login', { replace: true });
        } catch (error) {
            console.log(error.message);
            setErrorMessage({ error: error.message });
            navigate('/404');
        }
    }

    return (
        <>
            <title>Изход</title>
            {errorMessage
                ? <p className="error-message"> {errorMessage.error}</p>
                : ""
            }
            <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
            <div className={styles.centered}>
                <h1 className={styles.logoutModalHeader}>Сигурни ли сте, че искате да излезете?</h1>
                <input type="button" className={styles.logoutModalBtn} onClick={() => { setUser(handleLogout) }} value="Изход!" />
                <input type="button" className={styles.logoutModalBtn} onClick={() => setIsOpen(false)} value="Отказ" />
            </div>
        </>
    );
}