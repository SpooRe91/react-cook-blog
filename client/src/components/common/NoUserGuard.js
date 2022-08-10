import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";


export const NoUserGuard = ({ children }) => {

    const { user } = useContext(LoggedUserContext);

    if (!user) {
        console.log("unauthorised");
        return <Navigate to="/404" replace />
    }

    return children ? children : <Outlet />
};
