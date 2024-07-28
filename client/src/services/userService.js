import { endpoints } from "../API/endpoints";

export const userRegister = async (registerData) => {
    try {
        const registerResult = await fetch(endpoints.API_REGISTER, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Allow-Control-Access-Policy": true,
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(registerData),
        });
        return await registerResult.json();
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

export const userLogin = async (loginData) => {
    try {
        const loginResult = await fetch(endpoints.API_LOGIN, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
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
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getUser = async (id) => {
    try {
        const profileResult = await fetch(endpoints.API_GET_USER(id), {
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await profileResult.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const editUserImage = async (editData, id) => {
    try {
        const profileResult = await fetch(endpoints.API_EDIT_USER_IMAGE(id), {
            method: "PUT",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: editData }),
        });
        return await profileResult.json();
    } catch (error) {
        throw new Error(error.message);
    }
};
