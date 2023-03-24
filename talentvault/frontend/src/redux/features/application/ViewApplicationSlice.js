import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import ViewApplicationServices from './ViewApplicationServices'

const initialState = {
    application: null,
    applications: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getApplicationForJob = createAsyncThunk(
    'applications/getApplicationForJob',
    async (id, thunkAPI) => {
        try {
            return await ViewApplicationServices.getApplicationForJob(id)
        } catch (err) {
            const message = (
                err.response && err.response.data && err.response.data.message
            ) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const jobPostingSlice = createSlice({
    name: "application",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder

            .addCase(getApplicationForJob.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getApplicationForJob.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.applications = action.payload
            })
            .addCase(getApplicationForJob.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
    }
})


export const { } = jobPostingSlice.actions

export const selectIsLoading = (state) => state.application.isLoading


export default jobPostingSlice.reducer