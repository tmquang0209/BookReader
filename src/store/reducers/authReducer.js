import {
    LOGIN_FAIL,
    LOGIN_PROCESS,
    LOGIN_SUCCESS,
    EMPTY_AUTH,
    SIGNUP_FAIL,
    SIGNUP_PROCESS,
    SIGNUP_SUCCESS,
} from "../actionTypes";

const initialState = {
    user: {},
    loggedIn: false,
    err: "",
};

export const authReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case EMPTY_AUTH:
            return initialState;
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
        default:
            return state;
    }
};
