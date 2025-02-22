import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import goalService from './goalService'
import { GOAL } from "../../types/types";
export interface IGoalIntialState {
    goals: GOAL[],
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string,
}

const initialState: IGoalIntialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


//create new goal
export const createGoal = createAsyncThunk<object, string, { rejectValue: string }>('goals/create', async (goalData: string, thunkAPI) => {
    try {
        const token: string = thunkAPI.getState().auth.user.token;
        return await goalService.createGoal(goalData, token);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//get goals
export const getGoal = createAsyncThunk<object, string, { rejectValue: string }>('goals/get', async (_, thunkAPI) => {
    try {
        const token: string = thunkAPI.getState().auth.user.token;
        return await goalService.getGoal(token);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//delete goals
export const deleteGoal = createAsyncThunk<object, string, { rejectValue: string }>('goals/delete', async (id, thunkAPI) => {
    try {
        const token: string = thunkAPI.getState().auth.user.token;
        return await goalService.deleteGoal(id, token);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state: IGoalIntialState) => initialState
    },
    extraReducers: builder => {
        builder
            .addCase(createGoal.pending, (state) => { state.isLoading = true })
            .addCase(createGoal.fulfilled, (state, action: PayloadAction<GOAL>) => {
                state.isLoading = false,
                    state.isSuccess = true,
                    state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected, (state, action: PayloadAction<string>) => {
                state.isLoading = false,
                    state.isError = true,
                    state.message = action.payload
            })
            .addCase(getGoal.pending, (state) => { state.isLoading = true })
            .addCase(getGoal.fulfilled, (state, action: PayloadAction<GOAL[]>) => {
                state.isLoading = false,
                    state.isSuccess = true,
                    state.goals = [...action.payload]
            })
            .addCase(getGoal.rejected, (state, action: PayloadAction<string>) => {
                state.isLoading = false,
                    state.isError = true,
                    state.message = action.payload
            })
            .addCase(deleteGoal.pending, (state) => { state.isLoading = true })
            .addCase(deleteGoal.fulfilled, (state, action: PayloadAction<{ id: string, message: string }>) => {
                console.log(action.payload)
                state.isLoading = false,
                    state.isSuccess = true,
                    state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)
            })
            .addCase(deleteGoal.rejected, (state, action: PayloadAction<string>) => {
                state.isLoading = false,
                    state.isError = true,
                    state.message = action.payload
            })
    }
});


export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
