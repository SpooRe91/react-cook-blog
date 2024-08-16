import { useContext } from "react";

import { getAll } from "../services/mealService";
import { ErrorContext } from "../contexts/ErrorMessageContext";


export function useAllMeals() {
    const { setErrorMessage } = useContext(ErrorContext);

    const getAllMeals = (signal, controller) => getAll(signal, controller)
        .then(res => {
            if (res.length > 0) {
                return res;
            }
            if (res.message) throw new Error(res.message);

        }).catch(error => {
            if (controller.signal.aborted) { return }
            console.log(error.message);
            setErrorMessage(error.message);
            return;
        });
    return { getAllMeals, loading: false };
};