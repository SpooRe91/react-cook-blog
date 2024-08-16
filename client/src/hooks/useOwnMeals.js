import { useCallback, useContext, useEffect, useState } from "react";

import { getOwn } from "../services/mealService";
import { ErrorContext } from "../contexts/ErrorMessageContext";

export function useOwnMeals() {
    const [notDeleted, setNotDeleted] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { setErrorMessage } = useContext(ErrorContext);

    const getOwnRecipes = useCallback(
        async (signal, controller) => {
            setIsLoading(true);
            try {
                const res = await getOwn(signal, controller);
                if (!Array.isArray(res)) {
                    return;
                }
                setNotDeleted(res);
            } catch (error) {
                if (signal.aborted) {
                    return;
                }
                console.log(error);
                setErrorMessage("An unexpected error occured, please try again later!");
                return;
            } finally {
                setIsLoading(false);
            }
        },
        [setErrorMessage]
    );

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;
        getOwnRecipes(signal, controller);

        return () => {
            setErrorMessage("");
            setIsLoading(false);
            controller.abort();
        };
    }, [setErrorMessage, getOwnRecipes]);

    return { notDeleted, isLoading };
}
