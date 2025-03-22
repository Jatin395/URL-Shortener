const BASE_URL = "https://url-backend-631w.onrender.com";

const PATH = {
    AUTH: {
        SIGNUP: `${BASE_URL}/user/register`,
        LOGIN: `${BASE_URL}/user/login`,
        GETUSER: `${BASE_URL}/user/getuser`,
        LOGOUT: `${BASE_URL}/user/logout`
    },
    URL: {
        CREATE: `${BASE_URL}/url/create`,
        VIEW: `${BASE_URL}/url/viewUrl/`,
        GET: `${BASE_URL}/url/view/`,
        USER_URL: `${BASE_URL}/url/user-get`,
        UPDATE: `${BASE_URL}/url/update/`,
        DELETE: `${BASE_URL}/url/delete/`
    }
}

export default PATH;