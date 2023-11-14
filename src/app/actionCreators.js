import axios from "axios";
import { categoriesSlice } from '../features/categories/categoriesSlice';
import { API_URL } from "../shared/const/constants";
import { authSlice } from "../features/auth/authSlice";
import { modalSlice } from "../features/modal/modalSlice";
import { filtersSlice } from "../features/filters/filtersSlice";
import $api from "../shared/configs/axiosConfig";


//КАТЕГОРИИ
export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch(categoriesSlice.actions.categoriesFetching())
        const response = await axios.get(API_URL + "AccessoryTypes");
        dispatch(categoriesSlice.actions.categoriesFetchingSuccess(response.data))
    } catch (e) {
        if (e) {
            dispatch(categoriesSlice.actions.categoriesFetchingError(e.message))
        }
    }
}

export const addCategory = (category) => async (dispatch) => {
    try {
        const response = await $api.post(API_URL + "AccessoryTypes", category);
        dispatch(categoriesSlice.actions.addCategorySuccess(response.data))
    } catch (e) {
        if (e) {
            dispatch(categoriesSlice.actions.addCategoryError(e.message))
        }
    }
}

export const deleteCategory = (id) => async (dispatch) => {
    try {
        await $api.delete(API_URL + `AccessoryTypes/${id}`);
        dispatch(categoriesSlice.actions.deleteCategorySuccess(id))
    } catch (e) {
        if (e) {
            dispatch(categoriesSlice.actions.deleteCategoryError(e.message))
        }
    }
}

export const editCategory = (category) => async (dispatch) => {
    try {
        await $api.put(API_URL + `AccessoryTypes/${category.id}`, { ...category });
        dispatch(categoriesSlice.actions.editCategorySuccess(category))
    } catch (e) {
        if (e) {
            dispatch(categoriesSlice.actions.editCategoryError(e.message))
        }
    }
}
//КАТЕГОРИИ



//АВТОРИЗАЦИЯ
export const loginFunc = (login, password) => async (dispatch) => {
    try {
        dispatch(authSlice.actions.login());
        const response = await axios.post(API_URL + "Auth/login", { email: login, password });
        // const response = await AuthService.login(login, password);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify({ email: response.data.email, role: response.data.role }));
        dispatch(authSlice.actions.loginSuccess(response.data));
        dispatch(modalSlice.actions.close())
    } catch (e) {
        if (e) {
            dispatch(authSlice.actions.loginError(e.message))
        }
    }
}

export const registerFunc = (user) => async (dispatch) => {
    try {
        // dispatch(authSlice.actions.login());
        // const response = await AuthService.register(login, password);
        const response = await axios.post(
            API_URL + "Auth/",
            { ...user },
            { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
        );
        console.log(e)
        // localStorage.setItem('accessToken', response.data.accessToken);
        // localStorage.setItem('refreshToken', response.data.refreshToken);
        // dispatch(authSlice.actions.loginSuccess(response.data.user));
    } catch (e) {
        if (e) {
            console.log(e)
            // dispatch(authSlice.actions.loginError(e.message))
        }
    }
}

export const logoutFunc = () => async (dispatch) => {
    try {
        // const response = await AuthService.logout();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user')
        dispatch(authSlice.actions.logout())
    } catch (e) {
        if (e) {
            dispatch(authSlice.actions.loginError(e.message))
        }
    }
}

export const checkAuth = () => async (dispatch) => {
    try {
        const response = await axios.post(`${API_URL}Auth/refreshtoken`, {
            refreshToken: localStorage.getItem('refreshToken'),
            accessToken: localStorage.getItem('accessToken')
        })
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify({ email: response.data.email, role: response.data.role }));
        dispatch(authSlice.actions.checkAuth({ isAuth: true, user: response.data }))
    } catch (e) {
        if (e) {
            dispatch(authSlice.actions.checkAuth({ isAuth: false, user: {} }))
        }
    }
}
//АВТОРИЗАЦИЯ

//Фильтры

export const fetchFilters = (accessoryTypeId) => async (dispatch) => {
    try {
        dispatch(filtersSlice.actions.fetchFilters())
        const response = await axios.get(`${API_URL}Accessories/unique-countries-and-manufacturers?accessoryTypeId=${accessoryTypeId}`);
        dispatch(filtersSlice.actions.fetchFiltersSuccess(response.data))
    } catch (e) {
        dispatch(filtersSlice.actions.fetchFiltersError(e.message))
    }
}

//Фильтры

