import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    categories: [

    ],
    isLoading: false,
    getCategoriesError: '',
    addCategoriesError: '',
    deleteCategoriesError: '',
    editCategoryError: ''
}


export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        categoriesFetching(state) {
            state.isLoading = true;
        },
        categoriesFetchingSuccess(state, action) {
            state.isLoading = false;
            state.getCategoriesError = '';
            state.categories = action.payload;
        },
        categoriesFetchingError(state, action) {
            state.isLoading = false;
            state.getCategoriesError = action.payload;
        },
        addCategorySuccess(state, action) {
            state.addCategoriesError = '';
            state.categories = [...state.categories, action.payload];
        },
        addCategoryError(state, action) {
            state.isLoading = false;
            state.addCategoriesError = action.payload;
        },
        deleteCategorySuccess(state, action) {
            state.deleteCategoriesError = '';
            state.categories = state.categories.filter(category => category.id !== action.payload);
        },
        deleteCategoryError(state, action) {
            state.deleteCategoriesError = action.payload;
        },
        editCategorySuccess(state, action) {
            state.editCategoryError = '';
            state.categories = state.categories.map(category => category.id === action.payload.id ? action.payload : category);
        },
        editCategoryError(state, action) {
            state.editCategoryError = action.payload;
        },
    }
})

export default categoriesSlice.reducer