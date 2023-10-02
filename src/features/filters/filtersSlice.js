import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    countrys: [],
    manufacturers: [],
    isLoading: false,
    error: ''
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        fetchFilters: (state) => {
            state.isLoading = true;
            state.error = ''
        },
        fetchFiltersSuccess: (state, action) => {
            state.isLoading = false;
            state.error = ''
            state.countrys = action.payload.uniqueCountries;
            state.manufacturers = action.payload.uniqueManufacturers;
        },
        fetchFiltersError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export const { fetchFilters, fetchFiltersSuccess, fetchFiltersError } = filtersSlice.actions

export default filtersSlice.reducer