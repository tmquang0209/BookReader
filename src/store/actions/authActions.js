import { LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_PROCESS, SIGNUP_PROCESS, SIGNUP_FAIL, SIGNUP_SUCCESS, EMPTY_AUTH } from "../actionTypes";
import { login, register } from "../../API/authUser";

export const emptyAuth = () => {
    return async (dispatch) => {
        dispatch({
            type: EMPTY_AUTH,
            payload: { err: "" },
        });
    };
};

export const loginUser = (userData) => {
    return async (dispatch) => {
        try {
            dispatch(loginProcess());
            const response = await login(userData);

            if (response.success) {
                dispatch(loginSuccess(response.userData));
            } else {
                dispatch(loginFail(response.error));
            }
        } catch (error) {
            // Handle error if the request fails
            dispatch(loginFail(error.response.data.error));
        }
    };
};

// login process
const loginProcess = () => ({
    type: LOGIN_PROCESS,
    payload: { err: "" },
});
// login success
const loginSuccess = (userData) => ({
    type: LOGIN_SUCCESS,
    payload: { loggedIn: true, user: userData },
});

const loginFail = (message) => ({
    type: LOGIN_FAIL,
    payload: { err: message },
});

export const signupAccount = (userData) => {
    return async (dispatch) => {
        try {
            dispatch(signupProcess());
            const response = await register(userData);
            console.log("response", response);
            if (response.success) {
                dispatch(signupSuccess(response.userData[0]));
            } else {
                dispatch(signupFail(response.error));
            }
        } catch (err) {
            console.error(err);
            signupFail(err.response.data.error);
        }
    };
};

const signupProcess = () => ({
    type: SIGNUP_PROCESS,
    payload: { err: "" },
});

const signupFail = (message) => ({
    type: SIGNUP_FAIL,
    payload: { err: message },
});

const signupSuccess = (userData) => ({
    type: SIGNUP_SUCCESS,
    payload: { user: userData, loggedIn: false },
});
