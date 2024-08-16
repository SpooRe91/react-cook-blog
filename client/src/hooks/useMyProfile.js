import { useContext } from "react";

import { getUser } from "../services/userService";
import { ErrorContext } from "../contexts/ErrorMessageContext";

export function useProfile(id) {
    const { setErrorMessage } = useContext(ErrorContext);

    const getUserProfile = (controller, signal) => getUser(id, controller, signal)
        .then(res => {
            if (res._id) {
                return res;
            }
            if (res.message) throw new Error(res.message);
        })
        .catch(error => {
            if (controller.signal.aborted) { return }
            console.log(error.message);
            setErrorMessage(error.message);
        });

    return { getUserProfile, loading: false };
}