export const ErrorPage = ({errorMessage}) => {
    console.log(errorMessage);

    return (
        <div className="container">
            <main>
                <>
                    {errorMessage
                        ? <p style={{ "color": 'red' }}> {errorMessage.error}</p>
                        : ""
                    }
                </>
            </main>
        </div>
    )
}