import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import applicationService from './applicationServices'

const initialState = {
    application: null,
    applications: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getApplicationForUser = createAsyncThunk(
    'applications/getApplicationForUser',
    async (id, thunkAPI) => {
        try {
            return await applicationService.getApplicationForUser(id)
        } catch (err) {
            const message = (
                err.response && err.response.data && err.response.data.message
            ) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder

            .addCase(getApplicationForUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getApplicationForUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.applications = action.payload
            })
            .addCase(getApplicationForUser.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
    }
})


export const { } = applicationSlice.actions

export const selectIsLoading = (state) => state.application.isLoading


export default applicationSlice.reducer