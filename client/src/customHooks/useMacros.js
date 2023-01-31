import { useContext } from "react";

import { getMacros } from "../services/mealService";
import { ErrorContext } from "../contexts/ErrorMessageContext";


export function useAllMacros() {
    const { setErrorMessage } = useContext(ErrorContext);

    const getAllMacros = () => getMacros()
        .then(res => {
            if (res.length > 0) {
                return res;
            }
        }).catch(error => {
            console.log(error.message);
            setErrorMessage(error.message);
        });

    return { getAllMacros, loading: false };
};