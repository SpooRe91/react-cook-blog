export const ErrorPage = (props) => {
    return (
        <div className="container">
            <main>
                <h1 className="error-message">404 Not found!</h1>
                {props.error && <h1 className="error-message">{props.error.message}</h1>}
            </main>
        </div>
    )
}