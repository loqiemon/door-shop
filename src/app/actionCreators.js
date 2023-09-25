import axios from "axios";
import { cartSlice } from '../features/cart/cartSlice';
import { categoriesSlice } from '../features/categories/categoriesSlice';
import { API_URL } from "../services/constants";
import { authSlice } from "../features/auth/authSlice";
import AuthService from '../services/AuthService'
import { modalSlice } from "../features/modal/modalSlice";
import { productsSlice } from "../features/products/productsSlice";
import $api from "../services/axiosConfig";



//КАТЕГОРИИ
export const fetchCategories = () => async(dispatch) => {
    try {
        dispatch(categoriesSlice.actions.categoriesFetching())
        const response = await axios.get(API_URL+"AccessoryTypes");
        dispatch(categoriesSlice.actions.categoriesFetchingSuccess(response.data))
    } catch (e) {
        if (e) {
            dispatch(categoriesSlice.actions.categoriesFetchingError(e.message))
        }
    }
}

export const addCategory = (category) => async(dispatch) => {
    try {
        const response = await $api.post(API_URL+"AccessoryTypes", category);
        dispatch(categoriesSlice.actions.addCategorySuccess(response.data))
    } catch (e) {
        if (e) {
            dispatch(categoriesSlice.actions.addCategoryError(e.message))
        }
    }
}

export const deleteCategory = (id) => async(dispatch) => {
    try {
        await $api.delete(API_URL+`AccessoryTypes/${id}`);
        dispatch(categoriesSlice.actions.deleteCategorySuccess(id))
    } catch (e) {
        if (e) {
            dispatch(categoriesSlice.actions.deleteCategoryError(e.message))
        }
    }
}

export const editCategory = (category) => async(dispatch) => {
    try {
        await $api.put(API_URL+`AccessoryTypes/${category.id}`, {...category});
        dispatch(categoriesSlice.actions.editCategorySuccess(category))
    } catch (e) {
        if (e) {
            dispatch(categoriesSlice.actions.editCategoryError(e.message))
        }
    }
}
//КАТЕГОРИИ



//АВТОРИЗАЦИЯ
export const loginFunc = (login, password) => async(dispatch) => {
    try {
        dispatch(authSlice.actions.login());
        console.log(login, password)
        const response = await axios.post(API_URL+"Auth/login", {email: login, password});
        console.log(response.data)
        // const response = await AuthService.login(login, password);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', {email: response.data.email, role: response.data.role});
        dispatch(authSlice.actions.loginSuccess(response.data));
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
        // const response = await AuthService.register(login, password);
        const response = await axios.post(API_URL+"Auth/register", {login, password});
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
        const response = await axios.get(API_URL+"/Auth/checkAuth");
        dispatch(authSlice.actions.checkAuth({isAuth: true, user: response.data}))
    } catch (e) {
        if (e) {
            dispatch(authSlice.actions.checkAuth({isAuth: false, user: {}}))
        }
    }
}
//АВТОРИЗАЦИЯ


//Товары
export const fetchProducts = (id) => async(dispatch) => {
    try {
        dispatch(productsSlice.actions.productsFetching())
        if (id) {
            const response = await axios.get(API_URL+`Accessories?typeId=${id}`);
            dispatch(productsSlice.actions.productsFetchingSuccess(response.data))
        } else {
            const response = await axios.get(API_URL+"Accessories");
            dispatch(productsSlice.actions.productsFetchingSuccess(response.data))
        }
    } catch (e) {
        if (e) {
            dispatch(productsSlice.actions.productsFetchingError(e.message))
        }
    }
}

export const addProduct = (product) => async(dispatch) => {
    try {
        const response = await $api.post(API_URL+"Accessories", {...product});
        
        dispatch(productsSlice.actions.addProductSuccess(response.data))
    } catch (e) {
        if (e) {
            dispatch(productsSlice.actions.addProductError(e.message))
        }
    }
}

export const deleteProduct = (id) => async(dispatch) => {
    try {
        await $api.delete(API_URL+`Accessories/${id}`);
        dispatch(productsSlice.actions.deleteProductSuccess(id))
    } catch (e) {
        if (e) {
            dispatch(productsSlice.actions.deleteProductError(e.message))
        }
    }
}

export const editProduct = (product) => async(dispatch) => {
    try {
        const response = await $api.put(API_URL+`Accessories/${product.id}`, {...product});
        dispatch(productsSlice.actions.editProductSuccess(response.data))
    } catch (e) {
        if (e) {
            console.error(e)
            dispatch(productsSlice.actions.editProductError(e.message))
        }
    }
}

//Товары