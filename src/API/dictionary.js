import axios from "axios";
import { API_URI } from "./url";

export const translateByWord = async (word) => {
    try {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        console.log(url);
        const response = await axios.get(url);
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const saveWordToDb = async (userId, word) => {
    try {
        const url = `${API_URI}/api/addNewWord`;
        const response = await axios.post(url, {
            idUser: userId,
            word: word,
        });
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getWordList = async (userId) => {
    try {
        const url = `${API_URI}/api/getDictionary/${userId}`;
        const response = await axios.get(url);
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const deleteWord = async (userId, word) => {
    try {
        const url = `${API_URI}/api/deleteWord`;
        const response = await axios.delete(url, {
            data: {
                idUser: userId,
                word,
            },
        });
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const checkWord = async (userId, word) => {
    try {
        const url = `${API_URI}/api/wordIsExists`;
        const response = await axios.post(url, {
            idUser: userId,
            word,
        });
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};
