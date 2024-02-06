import axios from "axios";
import { API_URI } from "./url";

export const getAllChallenges = async (userId) => {
    try {
        const response = await axios.get(`${API_URI}/api/getAllChallenges/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};

export const createChallenge = async (userId, challenge) => {
    try {
        console.log({ ...challenge, idUser: userId });
        const response = await axios.post(`${API_URI}/api/createNewChallenge`, { ...challenge, idUser: userId });
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};

export const updateChallengeDetails = async (userId, challenge) => {
    try {
        const response = await axios.post(`${API_URI}/api/updateChallenge`, { ...challenge, idUser: userId });
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};

export const deleteChallenge = async (userId, challengeId) => {
    try {
        const response = await axios.delete(`${API_URI}/api/deleteChallenge`, { data: { idUser: userId, idChallenge: challengeId } });
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};

export const getChallengeById = async (userId, challengeId) => {
    try {
        const response = await axios.get(`${API_URI}/api/getChallengeById`, { idUser: userId, idChallenge: challengeId });
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};
