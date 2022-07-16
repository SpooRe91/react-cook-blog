import { Link } from "react-router-dom";

export const ErrorPage = ({ errorMessage }) => {
    console.log(errorMessage);

    return (
        <div className="container" style={{ 'display': "flex" }}>
            <title>Грешка...</title>
            <main >
                <h1 className="auth-error">{errorMessage}</h1>
                <>
                    {errorMessage
                        ? <p className="error-message"> {errorMessage.error}</p>
                        : ""
                    }
                </>
                <Link to="/">Обратно към началната страница</Link>
            </main>
        </div>
    )
}