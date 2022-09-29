import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import baseUrl from './api/baseUrl';

const initialState = {
    tokenFromSiginUp: null,
    tokenFromLogin: null
};

export const signUp = createAsyncThunk(
    'globalReducer/signUp',
    async (header) => {
        console.log("headider => ", header)
        const url = "/api/user/createuser";
        const response = await baseUrl.post(url, header);
        console.log(response, "data");
        return response.data;
    }
);

export const loginAction = createAsyncThunk(
    'globalReducer/login',
    async (header) => {
        const url = "/api/user/login";
        const respons = await baseUrl.post(url, header);
        return respons.data;
    }
);

export const globalSlice = createSlice({
    name: "globalReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUp.fulfilled, (state, action) => {
                state.tokenFromSiginUp = action.payload;
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.tokenFromLogin = action.payload;
            })
    }
});

export const getSignupToken = (state) => state.globalReducer.tokenFromSiginUp;
export const getLoginToken = (state) => state.globalReducer.tokenFromLogin;

export default globalSlice.reducer