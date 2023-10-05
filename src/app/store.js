import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import modalReducer from "../features/modal/modalSlice";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productsSlice";
import filtersReducer from '../features/filters/filtersSlice';
import ordersReducer from '../features/order/orderSlice';
import characteristicsReducer from '../features/characteristics/characteristicsSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        categories: categoriesReducer,
        modal: modalReducer,
        products: productReducer,
        filters: filtersReducer,
        orders: ordersReducer,
        characteristics: characteristicsReducer
    }
})