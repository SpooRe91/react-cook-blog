import { logoutSession } from "../API/api";
import { endpoints } from "../API/endpoints";

export const userLogin = async (loginData) => {

    try {
        const loginResult = await fetch(endpoints.API_LOGIN, {
            method: 'POST',
            mode: 'cors',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(loginData),
        });
        return await loginResult.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const userLogout = async () => {
    try {
        await fetch(endpoints.API_LOGOUT, {
            mode: "cors",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                "Access-Control-Allow-Credentials": true,
            }
        });
        logoutSession();
    } catch (error) {
        throw new Error(error.message);
    }
}