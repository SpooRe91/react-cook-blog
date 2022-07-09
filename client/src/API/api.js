export const setSession = (email, token, id) => {

    const user = { email, id, token };
    sessionStorage.setItem("User", JSON.stringify(user));
}

export const getSession = () => {
    return JSON.parse(sessionStorage.getItem('User'))
}

export const logoutSession = () => {
    sessionStorage.removeItem('User');
}

