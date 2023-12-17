import axios from "axios";
import { API_URI } from "./url";

export const getCategory = async () => {
    try {
        const response = await axios.get(`${API_URI}/api/getCategory`);
        const responseData = response.data;
        return responseData;
    } catch (err) {
        console.error(err);
        return [];
    }
};

export const addFavCat = async ({ userId, favCatIds }) => {
    try {
        console.log("add", { idUser: userId, favCatIds });
        const response = await axios.post(`${API_URI}/api/addCategoryFav`, { idUser: userId, favCatIds });
        const responseData = response.data;
        return responseData;
    } catch (err) {
        console.error(err);
        return [];
    }
};
