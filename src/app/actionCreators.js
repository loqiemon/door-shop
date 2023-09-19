import axios from "axios";
import { cartSlice } from '../features/cart/cartSlice';
import { categoriesSlice } from '../features/categories/categoriesSlice';
import { API_URL } from "../services/constants";
import { authSlice } from "../features/auth/authSlice";
import AuthService from "../services/authService";
import { modalSlice } from "../features/modal/modalSlice";


export const fetchCategories = () => async(dispatch) => {
    try {
        dispatch(categoriesSlice.actions.categoriesFetching())
        const response = await axios.get(API_URL+"categories");
        dispatch(categoriesSlice.actions.categoriesFetchingSuccess(response.data))
    } catch (e) {
        if (e) {
            dispatch(categoriesSlice.actions.categoriesFetchingError(e.message))
        }
    }
}


export const loginFunc = (login, password) => async(dispatch) => {
    try {
        dispatch(authSlice.actions.login());
        // const response = await axios.post(API_URL+"login", {login, password});
        const response = await AuthService.login(login, password);
        localStorage.setItem('token', response.data.accessToken);
        dispatch(authSlice.actions.loginSuccess(response.data.user));
        dispatch(modalSlice.actions.close())
    } catch (e) {
        if (e) {
            dispatch(authSlice.actions.loginError(e.message))
        }
    }
}

export const registerFunc = (login, password) => async(dispatch) => {
    try {
        dispatch(authSlice.actions.login());
        const response = await AuthService.register(login, password);
        localStorage.setItem('token', response.data.accessToken);
        dispatch(authSlice.actions.loginSuccess(response.data.user));
    } catch (e) {
        if (e) {
            dispatch(authSlice.actions.loginError(e.message))
        }
    }
}

export const logoutFunc = () => async(dispatch) => {
    try {
        const response = await AuthService.logout();
        localStorage.removeItem('token');
        dispatch(authSlice.actions.logout())
    } catch (e) {
        if (e) {
            dispatch(authSlice.actions.loginError(e.message))
        }
    }
}

export const checkAuth = () => async(dispatch) => {
    try {
        console.log(1)
        const response = await axios.get(API_URL+"checkAuth");
        dispatch(authSlice.actions.checkAuth({isAuth: true, user: response.data}))
    } catch (e) {
        if (e) {
            dispatch(authSlice.actions.checkAuth({isAuth: false, user: {}}))
        }
    }
}