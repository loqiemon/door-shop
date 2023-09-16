import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import categoriesReducer from "../features/categories/categoriesSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        categories: categoriesReducer,
    }
})