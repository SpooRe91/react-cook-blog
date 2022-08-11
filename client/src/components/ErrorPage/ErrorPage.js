import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ErrorContext } from "../../contexts/ErrorMessageContext";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";
import styles from "./ErrorPage.module.css";

export const ErrorPage = () => {
    //-------------------------------------------------------------------------------------------------
    const { user } = useContext(LoggedUserContext);
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);
    //-------------------------------------------------------------------------------------------------
    useEffect(() => {
        return () => {
            setErrorMessage("");
        }
    }, [setErrorMessage, user]);
    //-------------------------------------------------------------------------------------------------

    return (
        <div className={styles["error-container"]}>
            <title>Грешка...</title>
            <>
                {
                    <p className={styles["error-message"]}> {
                        errorMessage
                            ?
                            errorMessage
                            :
                            !user
                                ? "Неоторизирана заявка, моля първо влезте!"
                                : "Нямате достъп до тази заявка!"
                    }
                    </p>
                }
            </>
            <Link to="/">Обратно към началната страница</Link>
        </div>
    )
}