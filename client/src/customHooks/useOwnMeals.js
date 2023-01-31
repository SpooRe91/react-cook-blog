import { useContext } from "react";

import { getOwn } from "../services/mealService";
import { ErrorContext } from "../contexts/ErrorMessageContext";

export function useOwnMeals() {
    const { setErrorMessage } = useContext(ErrorContext);

    const getAllOwnMeals = () => getOwn()
        .then(res => {
            if (res.length > 0) {
                return res;
            }
            if (res.message) throw new Error(res.message);
        }).catch(error => {
            console.log(error.message);
            setErrorMessage(error.message);
            return;
        });
    return { getAllOwnMeals, loading: false };
}