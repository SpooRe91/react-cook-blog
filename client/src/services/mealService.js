
export const getOneById = async (endpoint) => {

    try {
        const res = await fetch(endpoint);
        return await res.json();
    } catch (error) {
        throw new Error(error.message)
    }
};