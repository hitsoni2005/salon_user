import axios from "axios";
import CheckToken from "./CheckToken";
import Logout from "./Logout";
import BASE_URL from "../config";

const api = axios.create({
    baseURL: BASE_URL
})

api.interceptors.request.use((config) => {
    const token = CheckToken();
    if (token) {
        config.headers["Authorization"] = "bearer " + token;
    }
    return config;
}
)

api.interceptors.response.use(
    res => res,
    err => {
        if (err.response.status === 401 || err.response.status === 403) {
            Logout();
        }
    }
)

export default api;