import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    categories: [
        {id: 1, name: 'Автоматические пороги', link: 'autoporog'},
        {id: 1, name: 'Дверные глазки', link: 'dooreye'},
        {id: 1, name: 'Задвижки', link: 'autoporog'},
        {id: 1, name: 'Замки навесные', link: 'autoporog'},
        {id: 1, name: 'Защелки', link: 'autoporog'},
        {id: 1, name: 'Раздвижные системы', link: 'autoporog'},
        {id: 1, name: 'Ручки дверные', link: 'door'},
        {id: 1, name: 'Ручки защелки', link: 'zasschelki'},
        {id: 1, name: 'Петли', link: 'petli'},
        {id: 1, name: 'Фурнитура', link: 'furniture'},
    ],
    isLoading: false,
    getCategoriesError: '',
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
    }
})

export default categoriesSlice.reducer