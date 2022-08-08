import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ErrorContext } from "../../contexts/ErrorMessageContext";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";
import styles from "./ErrorPage.module.css";

export const ErrorPage = () => {
    const { user } = useContext(LoggedUserContext);
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);

    useEffect(() => {
        if (!user) {
            setErrorMessage("Моля, първо влезте!");
        }
        return () => {
            setErrorMessage("")
        }
    }, [setErrorMessage, user]);

    return (
        <div className={styles["error-container"]}>
            <title>Грешка...</title>
            <>
                {
                    <p className={styles["error-message"]}> {
                        errorMessage
                            ? errorMessage
                            : "Възникна грешка при изпълнение на заявката Ви"
                    }
                    </p>
                }
            </>
            <Link to="/">Обратно към началната страница</Link>
        </div>
    )
}