import axios from "axios";
import { API_URI } from "./url";

export const getCategory = async () => {
    try {
        const response = await axios.get(`${API_URI}/api/getCategory`);
        const responseData = response.data;
        return responseData;
    } catch (err) {
        console.error(err);
        return err.response.data;
    }
};

export const getFavCategory = async (userId) => {
    try {
        const response = await axios.get(`${API_URI}/api/getFavCategory/${userId}`);
        const responseData = response.data;
        return responseData;
    } catch (err) {
        console.error(err);
        return err.response.data;
    }
};

export const addFavCat = async ({ userId, favCatIds }) => {
    try {
        console.log("add", { idUser: userId, favCatIds });
        const response = await axios.post(`${API_URI}/api/addFavCategory`, { idUser: userId, favCatIds });
        const responseData = response.data;
        return responseData;
    } catch (err) {
        console.error(err);
        return err.response.data;
    }
};
