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
        const response = await axios.post(`${API_URI}/api/registerUser`, userData);
        const responseData = response.data;
        return responseData;
    } catch (err) {
        console.error(err);
        return err.response.data;
    }
};

export const fetchForgotPassword = async (email) => {
    try {
        const response = await axios.post(`${API_URI}/api/forgotPassword`, { email });
        const responseData = response.data;
        return responseData;
    } catch (err) {
        console.error(err);
        return err.response.data;
    }
};

export const fetchVerifyCode = async (email, code) => {
    try {
        const response = await axios.post(`${API_URI}/api/authOTP`, { email, otp: Number(code) });
        const responseData = response.data;
        return responseData;
    } catch (err) {
        console.error(err);
        return err.response.data;
    }
};

export const resetPassword = async (email, otp, newPassword, reNewPassword) => {
    try {
        const response = await axios.post(`${API_URI}/api/resetPassword`, { email, otp: Number(otp), newPassword, rePassword: reNewPassword });
        const responseData = response.data;
        return responseData;
    } catch (err) {
        console.error(err);
        return err.response.data;
    }
};

export const updateInfoUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URI}/api/updateInfoUser`, { ...userData });
        const responseData = response.data;
        return responseData;
    } catch (err) {
        console.error(err);
        return err.response.data;
    }
};

export const updatePassword = async (info) => {
    try {
        const response = await axios.post(`${API_URI}/api/changePassword`, { ...info });
        const responseData = response.data;
        return responseData;
    } catch (err) {
        console.error(err);
        return err.response.data;
    }
};
