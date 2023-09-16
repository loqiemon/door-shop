import axios from "axios";
import { cartSlice } from '../features/cart/cartSlice';
import { categoriesSlice } from '../features/categories/categoriesSlice';
import { API_URL } from "../services/constants";


export const fetchCategories = () => async(dispatch) => {
    try {
        dispatch(categoriesSlice.actions.categoriesFetching())
        const response = await axios.get(API_URL+"/categories");
        dispatch(categoriesSlice.actions.categoriesFetchingSuccess(response.data))
    } catch (e) {
        if (e) {
            dispatch(categoriesSlice.actions.categoriesFetchingError(e.message))
        }
    }
}