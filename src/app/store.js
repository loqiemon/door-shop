import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'

import cartReducer from "../features/cart/cartSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import modalReducer from "../features/modal/modalSlice";
import authReducer from "../features/auth/authSlice";
import filtersReducer from '../features/filters/filtersSlice';
import { orderApi } from '../features/order/orderApi';
import { productApi } from '../features/products/productApi'
import { csvApi } from "../features/csv/csvApi";
import { categoriesApi } from "../features/categories/categoriesApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        categories: categoriesReducer,
        modal: modalReducer,
        filters: filtersReducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [csvApi.reducerPath]: csvApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(orderApi.middleware)
            .concat(csvApi.middleware)
            .concat(productApi.middleware)
            .concat(categoriesApi.middleware),
})

setupListeners(store.dispatch)