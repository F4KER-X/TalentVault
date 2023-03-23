import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import createApplicationService from './createApplicationServices'

const initialState = {
    application: null,
    applications: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//*app se5vicde
export const createNewApplication = createAsyncThunk(
    'applications/createNewApplication',
    async (id, thunkAPI) => {
        try {
            console.log("INSIDE CREATE SLICE");
            console.log("THIS IS ID IN APP" + id);
            return await createApplicationService.createNewApplication({
                jobId: id
            })
        } catch (err) {
            const message = (
                err.response && err.response.data && err.response.data.message
            ) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const createApplicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder

            .addCase(createNewApplication.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNewApplication.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.applications = action.payload
            })
            .addCase(createNewApplication.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { } = createApplicationSlice.actions

export const selectIsLoading = (state) => state.application.isLoading

export default createApplicationSlice.reducer
