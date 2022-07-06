
export const API = "http://localhost:3030";//GET

//REGULAR + MODIFICATIONS**************
export const API_DETAILS = (id) => `${API}/details/${id}`;//GET req

export const API_EDIT = (id) => `${API}/edit/${id}`;//PUT req

export const API_DELETE = (id) => `${API}/${id}`;//DELETE req

//AUTH*********************************
export const API_REGISTER = `${API}/auth/register`;//POST req

export const API_LOGIN = `${API}/auth/login`;//POST req

export const API_LOGOUT = `${API}/auth/logout`;//GET req

//RECIPE*******************************
export const API_BROWSE = `${API}/recipe/browse`;//GET req

export const API_MYRECIPES = `${API}/recipe/myRecipes`;//GET req

export const API_ADD = `${API}/recipe/add`;//POST req
