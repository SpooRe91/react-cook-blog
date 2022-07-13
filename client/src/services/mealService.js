import { endpoints } from "../API/endpoints";

export const getOne = async ({ userId }) => {
    
    try {
        const res = await fetch(endpoints.API_DETAILS(userId), {
            mode: 'cors',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                "Access-Control-Allow-Credentials": true,
            },
        })
        return await res.json();
    } catch (error) {
        throw new Error(error.message)
    }
};

export const getAll = async () => {

    try {
        const res = await fetch(endpoints.API_BROWSE, {
            mode: 'cors',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                "Access-Control-Allow-Credentials": true,
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
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                "Access-Control-Allow-Credentials": true,
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
            method: "POST",
            mode: 'cors',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(createData),
        });
        return await creteResult.json();

    } catch (error) {
        throw new Error(error.message)
    }
}