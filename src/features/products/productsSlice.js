import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    products: [
        
    ],
    isLoading: false,
    getProductsError: '',
    addProductsError: '',
    alert: '',
    deleteProductsError: '',
    editProductsError: ''
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productsFetching(state) {
            state.isLoading = true;
            state.products = [];
        },
        productsFetchingSuccess(state, action) {
            state.isLoading = false;
            state.getProductsError = '';
            state.products = action.payload;
        },
        productsFetchingError(state, action) {
            state.products = [];
            state.isLoading = false;
            state.getProductsError = action.payload;
        },
        addProduct(state) {
            state.isLoading = true;
        },
        addProductSuccess(state, action) {
            state.isLoading = false;
            state.addProductsError = '';
            state.alert = 'Успешно добавлен';
            state.products = [...state.products, action.payload];
        },
        deleteAlert(state) {
            state.alert = ''
        },
        addProductError(state, action) {
            state.alert = 'Ошибка'
            state.isLoading = false;
            state.addProductsError = action.payload;
        },
        deleteProductSuccess(state, action) {
            state.deleteProductsError = '';
            state.alert = 'Успешно';
            state.products = state.products.filter(product => product.id !== action.payload);
        },
        deleteProductError(state, action) {
            state.deleteProductsError = action.payload;
            state.alert = 'Ошибка'
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