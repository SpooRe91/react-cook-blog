import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ErrorContext } from "../../contexts/ErrorMessageContext";
export const ErrorPage = () => {
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);

    console.log(errorMessage.error);

    useEffect(() => {
        return () => {
            setErrorMessage("")
        }
    }, [setErrorMessage])

    return (
        <div className="error-container">
            <title>Грешка...</title>
            <>
                {
                    <p className="error-message"> {errorMessage
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