export const ErrorPage = ({ errorMessage }) => {
    console.log(errorMessage);

    return (
        <div className="container">
            <main>
                <h1 className="auth-error">404</h1>
                <>
                    {errorMessage
                        ? <p className="error-message"> {errorMessage.error}</p>
                        : ""
                    }
                </>
            </main>
        </div>
    )
}