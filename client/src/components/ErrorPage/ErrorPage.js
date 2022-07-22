import { useEffect } from "react";
import { Link } from "react-router-dom";

export const ErrorPage = ({ errorMessage, setErrorMessage }) => {
    console.log(errorMessage.error);

    useEffect(() => {
        return () => {
            setErrorMessage("")
        }
    }, [])

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