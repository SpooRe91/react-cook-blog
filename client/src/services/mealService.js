import { endpoints } from '../API/endpoints';

export const getOne = async (mealId) => {

    try {
        const res = await fetch(endpoints.API_DETAILS(mealId), {
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
        throw new Error(error.message);
    }
};

export const getAll = async () => {

    try {
        const res = await fetch(endpoints.API_BROWSE, {
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
        throw new Error(error.message)
    }
};

export const getOwn = async () => {

    try {
        const res = await fetch(endpoints.API_MYRECIPES, {
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
        throw new Error(error.message)
    }
};

export const getMacros = async () => {

    try {
        const res = await fetch(endpoints.API_MACROS, {
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
        throw new Error(error.message)
    }
};

export const create = async (createData) => {

    try {
        const creteResult = await fetch(endpoints.API_ADD, {
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
        throw new Error(error.message)
    }
}


export const editMeal = async (mealId, mealData) => {
    try {
        const editStatusInfo = await fetch(endpoints.API_EDIT(mealId), {
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
        throw new Error(error.message)
    }
}

export const addLike = async (mealId) => {

    try {
        const creteResult = await fetch(endpoints.API_LIKE(mealId), {
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
        throw new Error(error.message)
    }
}

export const deleteMeal = async (mealId) => {

    try {
        const deleteStatus = await fetch(endpoints.API_DELETE(mealId), {
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
        throw new Error(error.message)
    }
}