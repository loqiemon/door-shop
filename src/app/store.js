import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import modalReducer from "../features/modal/modalSlice";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productsSlice";
import filtersReducer from '../features/filters/filtersSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        categories: categoriesReducer,
        modal: modalReducer,
        products: productReducer,
        filters: filtersReducer
    }
})