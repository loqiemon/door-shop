import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    products: [
        
    ],
    isLoading: false,
    getProductsError: '',
    addProductsError: '',
    deleteProductsError: '',
    editProductsError: ''
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productsFetching(state) {
            state.isLoading = true;
        },
        productsFetchingSuccess(state, action) {
            state.isLoading = false;
            state.getProductsError = '';
            state.products = action.payload;
        },
        productsFetchingError(state, action) {
            state.isLoading = false;
            state.getProductsError = action.payload;
        },
        addProductSuccess(state, action) {
            state.addProductsError = '';
            state.products = [...state.products, action.payload];
        },
        addProductError(state, action) {
            state.isLoading = false;
            state.addProductsError = action.payload;
        },
        deleteProductSuccess(state, action) {
            state.deleteProductsError = '';
            state.products = state.products.filter(product => product.id !== action.payload);
        },
        deleteProductError(state, action) {
            state.deleteProductsError = action.payload;
        },
        editProductSuccess(state, action) {
            state.editProductsError = '';
            state.products = state.products.map(product => product.id === action.payload.id ? action.payload : product);
        },
        editProductError(state, action) {
            state.editProductsError = action.payload;
        },
    }
})

export default productsSlice.reducer