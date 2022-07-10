export const ErrorPage = (props) => {
    console.log(props);
    return (
        <div className="container">
            <main>
                <h1 className="error-message">Error</h1>
                {props.error && <h1 className="error-message">{props.error.message}</h1>}
            </main>
        </div>
    )
}