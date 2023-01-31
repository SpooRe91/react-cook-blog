import { useContext } from "react";

import { getAll } from "../services/mealService";
import { ErrorContext } from "../contexts/ErrorMessageContext";


export function useAllMeals() {
    const { setErrorMessage } = useContext(ErrorContext);

    const getAllMeals = () => getAll()
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
    return { getAllMeals, loading: false };
};