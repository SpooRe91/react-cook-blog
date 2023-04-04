import { useContext } from "react";

import { getMacros } from "../services/mealService";
import { ErrorContext } from "../contexts/ErrorMessageContext";


export function useAllMacros() {
    const { setErrorMessage } = useContext(ErrorContext);

    const getAllMacros = (controller, signal) => getMacros(signal, controller,)
        .then(res => {
            if (res.length > 0) {
                return res;
            }
        }).catch(error => {
            if (controller.signal.aborted) { return }
            console.log(error.message);
            setErrorMessage(error.message);
        });

    return { getAllMacros, loading: false };
};