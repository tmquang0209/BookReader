import axios from "axios";

import { API_URI } from "./url";

export const getInterestBook = async (userId) => {
    try {
        const response = await axios.get(`${API_URI}/api/getUserInterestCategory/${userId}`);
        const responseData = response.data;
        return responseData.success ? responseData : [];
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
};

export const search = async (keyword, topic = "all") => {
    try {
        const response = await axios.post(`${API_URI}/api/search`, {
            bookName: keyword,
            topic: topic,
        });

        const responseData = response.data;
        return responseData;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
};
