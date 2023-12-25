import { GET_CATEGORY_FAIL, GET_CATEGORY_SUCCESS, GET_FAVORITES_CAT_FAIL, GET_FAVORITES_CAT_SUCCESS } from "../actionTypes";

const initialState = {
    favoritesCat: [],
    categories: [],
    errFavCat: "",
    errCat: "",
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FAVORITES_CAT_SUCCESS:
            return { favoritesCat: [...action.payload.favCat], categories: [...state.cat] };

        case GET_FAVORITES_CAT_FAIL:
            return { errFavCat: action.payload.errFavCat };

        case GET_CATEGORY_SUCCESS:
            return { favoritesCat: [...state.favoritesCat], categories: [...action.payload.cat] };

        case GET_CATEGORY_FAIL:
            return { errCat: action.payload.errCat };

        default:
            return state;
    }
};
