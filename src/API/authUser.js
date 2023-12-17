import axios from "axios";
import { API_URI } from "./url";
export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URI}/api/authLogin`, userData);
        const responseData = response.data;
        return responseData;
    } catch (err) {
        console.error(err);
        return err.response.data;
    }
};

export const register = async (userData) => {
    try {
        const response = await axios.post(
            `${API_URI}/api/registerUser`,
            userData
        );
        const responseData = response.data;
        return responseData;
    } catch (err) {
        console.error(err);
        return err.response.data;
    }
};
