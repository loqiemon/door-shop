import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user: {},
    isAuth: false,
    isLoadingAuth: false,
    errorLogin: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        login: (state) => {
            state.isLoadingAuth = true;
        },
        loginSuccess: (state, action) => {
            state.isAuth = true;
            state.errorLogin = '';
            state.user = action.payload;
            state.isLoadingAuth = false;
        },
        loginError: (state, action) => {
            state.isAuth = false;
            state.errorLogin = action.payload;
            state.isLoadingAuth = false;
        },
        logout: (state) => {
            state.isAuth = false;
            state.user = {}
        },
        checkAuth: (state, action) => {
            state.isAuth = action.payload.isAuth;
            state.user = action.payload.user;
        }
    }
})

export default authSlice.reducer