import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    categories: [
        {id: 1, Type: 'Автоматические пороги', link: 'autoporog'},
        {id: 2, Type: 'Дверные глазки', link: 'dooreye'},
        {id: 3, Type: 'Задвижки', link: 'autoporog'},
        {id: 4, Type: 'Замки навесные', link: 'autoporog'},
        {id: 5, Type: 'Защелки', link: 'autoporog'},
        {id: 6, Type: 'Раздвижные системы', link: 'autoporog'},
        {id: 7, Type: 'Ручки дверные', link: 'door'},
        {id: 8, Type: 'Ручки защелки', link: 'zasschelki'},
        {id: 9, Type: 'Петли', link: 'petli'},
        {id: 10, Type: 'Фурнитура', link: 'furniture'},
        {id: 11, Type: 'wew', link: '234'},
        {id: 12, Type: 'wseg', link: 'furn242635iture'},
        {id: 13, Type: 'df', link: 'furn3463iture'},
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