import { endpoints } from "../API/endpoints";

export const userRegister = async (registerData) => {

    try {
        const registerResult = await fetch(endpoints.API_REGISTER, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(registerData),
        });
        return await registerResult.json();
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}

export const userLogin = async (loginData) => {

    try {
        const loginResult = await fetch(endpoints.API_LOGIN, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                'Access-Control-Allow-Credentials': true,
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
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                'Access-Control-Allow-Credentials': true,
            }
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

export const createProfile = async (profileData) => {

    try {
        const profileResult = await fetch(endpoints.API_CREATE_PROFILE, {
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(profileData),
        });
        return await profileResult.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const editProfile = async (editDate, id) => {

    try {
        const profileResult = await fetch(endpoints.API_EDIT_PROFILE(id), {
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(editDate),
        });
        return await profileResult.json();
    } catch (error) {
        throw new Error(error.message);
    }
};