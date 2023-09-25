import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [
        
    ]
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        readCart : (state) => {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            state.cartItems = storedCart;
        },
        addToCart: (state, action) => {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            const updatedCart = [...storedCart, action.payload];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            state.cartItems = updatedCart;
        },
        removeFromCart: (state, action) => {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            const filtered = storedCart.filter(item => item.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(filtered));
            state.cartItems = filtered;
        }
    }
})

export const { addToCart, removeFromCart, readCart } = cartSlice.actions

export default cartSlice.reducer