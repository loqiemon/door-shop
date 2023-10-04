import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    orders: [],
    error: '',
    isLoading: false
}


export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        fetchOrders: (state) => {
            state.isLoading = true;
            state.orders = [];
        },
        fetchOrdersError: (state, action) => {
            state.isLoading = false;
            state.orders = [];
            state.error = action.payload;
        },
        fetchOrdersSuccess: (state, action) => {
            state.isLoading = false;
            state.orders = action.payload;
            state.error = '';
        },
        addOrder: (state) => {
            state.isLoading = true;
        },
        addOrderError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        addOrderSuccess: (state, action) => {
            state.isLoading = false;
            state.orders = [...state.orders, action.payload];
            state.error = '';
        },
        deleteOrder: (state) => {
            state.isLoading = true;
        },
        deleteOrderError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        deleteOrderSuccess: (state, action) => {
            state.isLoading = false;
            state.orders = state.orders.filter(order => order.id !== action.payload);
            state.error = '';
        },
    }
})

export const { 
    fetchOrders,
    fetchOrdersError,
    fetchOrdersSuccess,
    addOrder,
    addOrderError,
    addOrderSuccess,
    deleteOrder,
    deleteOrderError,
    deleteOrderSuccess,
} = orderSlice.actions

export default orderSlice.reducer