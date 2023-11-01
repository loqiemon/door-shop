import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [

    ]
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        readCart: (state) => {
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
        },
        editInCart: (state, action) => {
            const cartItem = action.payload;
            let filtered = state.cartItems.map(item => {
                if (item.id == cartItem.id) {
                    return cartItem
                }
                return item
            });
            if (cartItem.count === 0) {
                filtered = filtered.filter(item => item.id !== cartItem.id)
            }
            localStorage.setItem('cart', JSON.stringify(filtered));
            state.cartItems = filtered;
        },
        clearCart: (state) => {
            localStorage.removeItem('cart');
            state.cartItems = [];
        }
    }
})

export const { addToCart, removeFromCart, readCart, editInCart, clearCart } = cartSlice.actions

export default cartSlice.reducer