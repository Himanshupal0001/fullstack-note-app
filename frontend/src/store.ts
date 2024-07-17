import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';
import goalReducer from './features/goal/goalSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        goals: goalReducer,
    }
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']