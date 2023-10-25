import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import cartReducer from "../features/cart/cartSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import modalReducer from "../features/modal/modalSlice";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productsSlice";
import filtersReducer from '../features/filters/filtersSlice';
import { orderApi } from '../features/order/orderApi';
import { productApi } from '../features/products/productApi'
import characteristicsReducer from '../features/characteristics/characteristicsApi'
import { csvApi } from "../features/csv/csvApi";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        categories: categoriesReducer,
        modal: modalReducer,
        products: productReducer,
        filters: filtersReducer,
        // orders: ordersReducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        characteristics: characteristicsReducer,
        // [csvApi.reducerPath]: csvApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(orderApi.middleware)
            // .concat(csvApi.middleware)
            .concat(productApi.middleware),
})

setupListeners(store.dispatch)