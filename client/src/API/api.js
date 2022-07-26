export const setSession = ({ email, id, image }) => {

    const user = { email, id, image };
    sessionStorage.setItem("User", JSON.stringify(user));
    localStorage.setItem("User", JSON.stringify(user));
}

export const getSession = () => {
    return (
        JSON.parse(sessionStorage.getItem('User')),
        JSON.parse(localStorage.getItem('User'))
    )
}

export const logoutSession = () => {
    sessionStorage.removeItem('User');
    localStorage.removeItem('User');
}

