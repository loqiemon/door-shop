import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [
        {name: "High External Stone Gate", id: 3, description: "The High External Stone Gate is used with High External Stone Walls as a door for a player's compound.", image: "/images/doors/gates.external.high.stone.png", price: 29000},
    ]
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartItems = [...state.cartItems, action.payload]
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload)
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer