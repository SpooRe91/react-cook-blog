
export const getOne = async (endpoint) => {

    try {
        const res = await fetch(endpoint, {
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

export const getAll = async (endpoint) => {

    try {
        const res = await fetch(endpoint, {
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

export const getOwn = async (endpoint) => {

    try {
        const res = await fetch(endpoint, {
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