import { getCategory, getFavCategory } from "../../API/category";
import { GET_CATEGORY_FAIL, GET_CATEGORY_SUCCESS, GET_FAVORITES_CAT_FAIL } from "../actionTypes";

export const getCatList = () => {
    return async (dispatch) => {
        try {
            const response = await getCategory();
            if (response.success) {
                dispatch(getCatSuccess(response.result));
            } else {
                dispatch(getCatFail(response.message));
            }
        } catch (err) {
            console.error(err);
            dispatch(getCatFail(err.message));
        }
    };
};

const getCatFail = (message) => ({
    type: GET_CATEGORY_FAIL,
    payload: { errCat: message },
});

const getCatSuccess = (data) => ({
    type: GET_CATEGORY_SUCCESS,
    payload: { cat: [...data] },
});

export const getFavCat = (userId) => {
    return async (dispatch) => {
        try {
            const response = await getFavCategory(userId);
            if (response.success) {
                dispatch(getFavCatSuccess(response.result));
            } else {
                dispatch(getFavCatFail(response.message));
            }
        } catch (err) {
            console.error(err);
        }
    };
};

const getFavCatFail = (message) => ({
    type: GET_FAVORITES_CAT_FAIL,
    payload: { errFavCat: message },
});

const getFavCatSuccess = (data) => ({
    type: GET_CATEGORY_SUCCESS,
    payload: {
        cat: data,
    },
});
