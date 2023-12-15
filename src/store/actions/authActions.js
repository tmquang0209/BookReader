import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "../actionTypes";

export const loginUser = (userData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post("https://domain.com/", {
                userData,
            });
            const responseData = response.data;
            setTimeout(() => {
                if (responseData) {
                    dispatch(loginSuccess(responseData.user));
                } else {
                    dispatch(loginFail(responseData.message));
                }
            }, 3000);
        } catch (error) {
            // Handle error if the request fails
            dispatch(loginFail(error.message));
        }
    };
};

// login success
const loginSuccess = (userData) => ({
    type: LOGIN_SUCCESS,
    payload: { loggedIn: true, user: userData },
});

const loginFail = (message) => ({
    type: LOGIN_FAIL,
    payload: { err: message },
});
