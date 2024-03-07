import axios from "axios";

import { API_URI, BOOK_URI } from "./url";
import { inProcess } from "../constants/text";
import { filterAndMapBooks } from "../utils/utilsFilterMapBook";

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
    /* try {
        const response = await axios.post(`${API_URI}/api/search`, {
            bookName: keyword,
            topic: topic,
        });
    try {
        const params = topic === "all" ? `search=${keyword}` : `search=${keyword}&topic=${topic}`;
        const response = await axios.get(`https://gutendex.com/books/?${params}`);

        const jsonData = response.data;

        const fetchedData = filterAndMapBooks(jsonData.results);
        return fetchedData;
    } catch (err) {
        console.log(err);
        return err.response.data;
    } */
    try {
        const params = topic === "all" ? `search=${keyword}` : `search=${keyword}&topic=${topic}`;
        const response = await axios.get(`${BOOK_URI}?${params}`);

        const jsonData = response.data;

        const fetchedData = filterAndMapBooks(jsonData.results);

        return fetchedData;
    } catch (error) {
        console.error(error);
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

export const getLastBookRead = async (userId) => {
    const url = `${API_URI}/api/getLastBookRead/${userId}`;

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

export const getTrendingBook = async () => {
    const url = `${BOOK_URI}?sort=popular`;
    try {
        const response = await axios.get(url);
        const responseData = response.data;
        const fetchedData = filterAndMapBooks(responseData.results);

        return fetchedData;
    } catch (error) {
        console.error("Error:", error.message);
        return error.response.data;
    }
    // const url = `${API_URI}/api/getTrending`;
    // try {
    //     const response = await axios.get(url);
    //     // Assuming a successful response with a JSON body
    //     const responseData = response.data;
    //     return responseData;
    // } catch (error) {
    //     // Handle errors
    //     console.error("Error:", error.message);
    //     return error.response.data;
    // }
};

export const updateStatusBook = async (userId, bookId, status) => {
    const url = `${API_URI}/api/updateStatus`;

    try {
        const response = await axios.post(url, {
            idUser: userId,
            idBook: bookId,
            status: status,
        });
        // Assuming a successful response with a JSON body
        const responseData = response.data;
        return responseData;
    } catch (error) {
        // Handle errors
        console.error("Error:", error.message);
        return error.response.data;
    }
};

export const deleteBookmark = async (userId, bookId) => {
    const url = `${API_URI}/api/deleteBookmark`;

    try {
        const response = await axios.delete(url, {
            data: {
                idUser: userId,
                idBook: bookId,
            },
        });
        // Assuming a successful response with a JSON body
        const responseData = response.data;
        return responseData;
    } catch (error) {
        // Handle errors
        console.error("Error:", error.message);
        return error.response.data;
    }
};

export const getBookStatus = async (userId, bookId) => {
    const url = `${API_URI}/api/getBookmark/${userId}/${bookId}`;

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
