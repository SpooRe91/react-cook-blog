import { createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { getSession } from "../API/api";

export const LoggedUserContext = createContext();

const cookies = new Cookies();

export const LoggedUserProvider = ({ children }) => {

    const [user, setUser] = useState(getSession());
    const [clientCookie, setClientCookie] = useState(cookies.get('user-session'));

    useEffect(() => {
        if (getSession() !== null) {
            cookies.set('user-session', getSession(), { path: "/", maxAge: 48000 });
            setClientCookie(cookies.get('user-session'));
        }
    }, [setClientCookie])
    
    const userHandler = (userInfo) => {
        setUser(userInfo);
    };

    return (
        <LoggedUserContext.Provider value={{ user, userHandler, clientCookie, setClientCookie, cookies }}>
            {children}
        </LoggedUserContext.Provider>
    )
}