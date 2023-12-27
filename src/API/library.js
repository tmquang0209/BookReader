import axios from "axios";
import { API_URI } from "./url";
import { savedBook } from "../constants/text";

export const getBookListByStatus = async (userId, status) => {
    try {
        const response = await axios.get(`${API_URI}/api/getBookByStatus/${userId}/${status}`);
        const responseData = response.data;
        // console.log(responseData);
        return responseData;
    } catch (err) {
        console.error(err);
        return err.response.data;
    }
};
