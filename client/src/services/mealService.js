import { endpoints } from '../API/endpoints';

export const getOne = async (mealId, controller, signal) => {

    try {
        const res = await fetch(endpoints.API_DETAILS(mealId), {
            signal: signal,
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                'Access-Control-Allow-Credentials': true,
            },
        })
        return await res.json();
    } catch (error) {
        if (controller.signal.aborted) { return }
        throw new Error(error.message);
    }
};

export const getAll = async (signal, controller) => {

    try {
        const res = await fetch(endpoints.API_BROWSE, {
            signal: signal,
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                'Access-Control-Allow-Credentials': true,
            }
        });
        return await res.json();
    } catch (error) {
        if (controller.signal.aborted) { return }
        throw new Error(error.message)
    }
};

export const getOwn = async (signal, controller) => {

    try {
        const res = await fetch(endpoints.API_MYRECIPES, {
            signal: signal,
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                'Access-Control-Allow-Credentials': true,
            }
        });
        return await res.json();
    } catch (error) {
        if (controller.signal.aborted) { return }
        throw new Error(error.message)
    }
};

export const getMacros = async (signal, controller) => {

    try {
        const res = await fetch(endpoints.API_MACROS, {
            signal: signal,
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                'Access-Control-Allow-Credentials': true,
            }
        });
        return await res.json();
    } catch (error) {
        if (controller.signal.aborted) { return }
        throw new Error(error.message)
    }
};

export const create = async (createData, signal, controller) => {

    try {
        const creteResult = await fetch(endpoints.API_ADD, {
            signal: signal,
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(createData),
        });
        return await creteResult.json();

    } catch (error) {
        if (controller.signal.aborted) { return }
        throw new Error(error.message)
    }
}


export const editMeal = async (mealId, mealData, signal, controller) => {
    try {
        const editStatusInfo = await fetch(endpoints.API_EDIT(mealId), {
            signal: signal,
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(mealData),
        });
        return await editStatusInfo.json();

    } catch (error) {
        if (controller.signal.aborted) { return }
        throw new Error(error.message)
    }
}

export const addLike = async (mealId, signal, controller) => {

    try {
        const creteResult = await fetch(endpoints.API_LIKE(mealId), {
            signal: signal,
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                'Access-Control-Allow-Credentials': true,
            }

        });
        return await creteResult.json();
    } catch (error) {
        if (controller.signal.aborted) { return }
        throw new Error(error.message)
    }
}

export const deleteMeal = async (mealId, signal, controller) => {

    try {
        const deleteStatus = await fetch(endpoints.API_DELETE(mealId), {
            signal: signal,
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                'Access-Control-Allow-Credentials': true,
            },

        });
        return deleteStatus;

    } catch (error) {
        if (controller.signal.aborted) { return }
        throw new Error(error.message)
    }
}