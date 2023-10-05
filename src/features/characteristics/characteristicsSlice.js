import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    characteristics: [],
    error: '',
    isLoading: false
}


export const characteristicsSlice = createSlice({
    name: 'characteristics',
    initialState,
    reducers: {
        fetchFeature: (state) => {
            state.isLoading = true;
        },
        fetchFeatureSuccess: (state, action) => {
            state.isLoading = false;
            state.error = ''
            state.characteristics = action.payload
        },
        fetchFeatureError: (state, action) => {
            state.isLoading = false;
            state.characteristics = [];
            state.error = action.payload;
        },
        addFeature: (state) => {
            state.isLoading = true;
        },
        addFeatureSuccess: (state, action) => {
            state.isLoading = false;
            state.error = ''
            state.characteristics = [...state.characteristics, action.payload]
        },
        addFeatureError: (state, action) => {
            state.isLoading = false;
            state.characteristics = [];
            state.error = action.payload;
        },
    }
});


export const { } = characteristicsSlice.actions;

export default characteristicsSlice.reducer;