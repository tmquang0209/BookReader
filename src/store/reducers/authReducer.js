import { LOGIN_FAIL, LOGIN_PROCESS, LOGIN_SUCCESS, EMPTY_AUTH, AUTO_LOGIN, SIGNUP_FAIL, SIGNUP_PROCESS, SIGNUP_SUCCESS, LOGOUT, UPDATE_INFO } from "../actionTypes";

//0: unchecked
//1: check false
//2: check true

const initialState = {
    user: {},
    loggedIn: false,
    localStorageCheck: "0",
    err: "",
};

export const authReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case EMPTY_AUTH:
            return initialState;
        case AUTO_LOGIN:
            return {
                ...state,
                user: action.payload?.user,
                loggedIn: action.payload?.loggedIn,
                localStorageCheck: action.payload.localStorageCheck,
            };
        case LOGIN_PROCESS:
        case SIGNUP_PROCESS:
            return {
                ...state,
                err: "",
            };
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };

        case LOGIN_FAIL:
        case SIGNUP_FAIL:
            return {
                ...state,
                ...action.payload,
            };

        case LOGOUT:
            return {
                ...state,
                user: action.payload.user,
                loggedIn: action.payload.loggedIn,
            };

        case UPDATE_INFO:
            return {
                ...state,
                user: action.payload.userData,
            };
        default:
            return state;
    }
};
