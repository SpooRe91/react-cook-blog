import { useContext } from "react";

import { getUser } from "../services/userService";
import { ErrorContext } from "../contexts/ErrorMessageContext";

export function useProfile(id) {
    const { setErrorMessage } = useContext(ErrorContext);

    const getUserProfile = () => getUser(id)
        .then(res => {
            if (res._id) {
                return res;
            }
            if (res.message) throw new Error(res.message);
        })
        .catch(error => {
            console.log(error.message);
            setErrorMessage(error.message);
        });

    return { getUserProfile, loading: false };
}