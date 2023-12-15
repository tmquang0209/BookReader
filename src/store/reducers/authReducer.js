import { LOGIN_FAIL, LOGIN_SUCCESS } from "../actionTypes";

const initialState = {
    user: {},
    loggedIn: false,
    err: "",
};

export const authReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };

        case LOGIN_FAIL:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};
