import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
// import jobService from './jobServices'
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
    async (formData, thunkAPI) => {
        try {
            return await applicationService.getApplicationForUser(formData)
        } catch (err) {
            const message = (
                err.response && err.response.data && err.response.data.message
            ) || err.message || err.toString()
            console.log(message);
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
            state.job = action.payload
        })
        .addCase(getApplicationForUser.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
            toast.error(action.payload)
        })
}
})


export const { } = applicationSlice.actions

// export const selectIsLoading = (state) => state.job.isLoading


export default applicationSlice.reducer