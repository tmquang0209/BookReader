import axios from "axios";

import { API_URI } from "./url";
import { inProcess } from "../constants/text";

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

export const savedLastRead = async (userId, bookId, cfi) => {
    try {
        const response = await axios.post(`${API_URI}/api/saveReadingProcess`, { idUser: userId, idBook: bookId, status: inProcess, lastPageReading: cfi });
        const responseData = response.data;
        return responseData;
    } catch (err) {
        console.error(err);
        return err.response.data;
    }
};

export const getLastPageReading = async (userId, bookId) => {
    const url = `${API_URI}/api/getLastPageReading/${userId}/${bookId}`;

    try {
        const response = await axios.get(url);
        // Assuming a successful response with a JSON body
        const responseData = response.data;
        return responseData;
    } catch (error) {
        // Handle errors
        console.error("Error:", error.message);
        return error.response.data;
    }
};