import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authService from './authService';
import { USER } from '../../types/types';
import { IUserData } from '../../types/registerType';
//Get user from local storage 

const user: USER = JSON.parse(localStorage.getItem('user'));

export interface IAuthInitalState {
    user: USER | null,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string
}


const initialState: IAuthInitalState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const register = createAsyncThunk<object, void, { rejectValue: string }>('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }

})

export const login = createAsyncThunk<object, void, { rejectValue: string }>('auth/login', async (user, thunkAPI) => {
    try {
        const serve = await authService.login(user);
        console.log(serve)
        return await authService.login(user);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }

})

export const logout = createAsyncThunk<object, void, { rejectValue: string }>('auth/logout', async (_, thunkAPI) => {
    try {
        return authService.logout();
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false,
                state.isError = false,
                state.isSuccess = false,
                state.message = ''
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, state => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.isSuccess = true,
                    state.user = action.payload
            })
            .addCase(register.rejected, (state, action: PayloadAction<string>) => {
                state.isLoading = false,
                    state.isError = true,
                    state.message = action.payload,
                    state.user = null
            })
            .addCase(logout.pending, state => {
                state.isLoading = true
            })
            .addCase(logout.fulfilled, state => {
                state.user = null
            })
            .addCase(logout.rejected, (state, action: PayloadAction<string>) => {
                state.message = action.payload
                state.isError = true
            })
            .addCase(login.pending, state => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<USER>) => {
                state.isLoading = false,
                    state.isSuccess = true,
                    state.user = action.payload
            })
            .addCase(login.rejected, (state, action: PayloadAction<string>) => {
                state.isLoading = false,
                    state.isError = true,
                    state.message = action.payload,
                    state.user = null
            })
    }

});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

