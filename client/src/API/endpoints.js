
export const API_URL = "http://localhost:3030";//GET

export const endpoints = {
    //REGULAR + MODIFICATIONS***************
    API_DETAILS: (id) => `${API_URL}/details/${id}`,//GET req
    API_EDIT: (id) => `${API_URL}/edit/${id}`,//PUT req
    API_DELETE: (id) => `${API_URL}/delete/${id}`,//DELETE req
    API_LIKE: (id) => `${API_URL}/like/${id}`,//GET req
    API_CREATE_PROFILE: `${API_URL}/profile-create`,//POST req
    API_EDIT_PROFILE: (id) => `${API_URL}/profile-edit/${id}`,//PUT req
    //AUTH**********************************
    API_REGISTER: `${API_URL}/auth/register`,//POST req
    API_LOGIN: `${API_URL}/auth/login`,//POST req
    API_LOGOUT: `${API_URL}/auth/logout`,//GET req
    //RECIPE********************************
    API_BROWSE: `${API_URL}/recipe/browse`,//GET req
    API_MYRECIPES: `${API_URL}/recipe/myRecipes`,//GET req
    API_MACROS: `${API_URL}/recipe/macros`,//GET req
    API_ADD: `${API_URL}/recipe/add`,//POST req
    // *************************************
}
