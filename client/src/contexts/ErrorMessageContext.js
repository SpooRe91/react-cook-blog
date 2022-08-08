import { createContext, useState } from "react";

export const ErrorContext = createContext();

export const ErrorContextProvider = ({ children }) => {

    const [errorMessage, setErrorMessage] = useState('');

    return (
        <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
            {children}
        </ErrorContext.Provider>
    )
}