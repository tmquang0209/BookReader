import { LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_PROCESS, SIGNUP_PROCESS, SIGNUP_FAIL, SIGNUP_SUCCESS, EMPTY_AUTH, AUTO_LOGIN, LOGOUT, UPDATE_INFO } from "../actionTypes";
import { login, register } from "../../API/authUser";
import { getAuthStorage, removeAuthStorage, setAuthStorage } from "../../components/localStorage";

export const emptyAuth = () => {
    return async (dispatch) => {
        dispatch({
            type: EMPTY_AUTH,
            payload: { err: "" },
        });
    };
};

export const autoLogin = () => {
    return async (dispatch) => {
        const data = await getAuthStorage();
        if (data) dispatch({ type: AUTO_LOGIN, payload: { user: data, loggedIn: true, localStorageCheck: "2" } });
        else dispatch({ type: AUTO_LOGIN, payload: { localStorageCheck: "1" } });
    };
};

export const loginUser = (userData) => {
    return async (dispatch) => {
        try {
            dispatch(loginProcess());
            const response = await login(userData);

            if (response.success) {
                dispatch(loginSuccess(response.userData));
                setAuthStorage(response.userData);
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

export const logoutUser = () => {
    return async (dispatch) => {
        try {
            await removeAuthStorage();
            dispatch({
                type: LOGOUT,
                payload: { user: {}, loggedIn: false },
            });
        } catch (err) {
            console.error(err);
        }
    };
};

export const updateInfo = (info) => {
    return async (dispatch) => {
        try {
            setAuthStorage(info);
            dispatch({ type: UPDATE_INFO, payload: { userData: info } });
        } catch (err) {
            console.error(err);
        }
    };
};
