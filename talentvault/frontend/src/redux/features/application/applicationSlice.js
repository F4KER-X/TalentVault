import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import applicationService from './applicationServices'

const initialState = {
    application: null,
    applications: [],
    isErrorApp: false,
    isSuccessApp: false,
    isLoadingApp: false,
    message: '',
}

export const getApplicationForUser = createAsyncThunk(
    'applications/getApplicationForUser',
    async (_, thunkAPI) => {
        try {
            return await applicationService.getApplicationForUser()
        } catch (err) {
            const message = (
                err.response && err.response.data && err.response.data.message
            ) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const createNewApplication = createAsyncThunk(
    'applications/createNewApplication',
    async (formData, thunkAPI) => {
        try {
            return await applicationService.createNewApplication(formData)
        } catch (err) {
            const message = (
                err.response && err.response.data && err.response.data.message
            ) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const getApplicationForJob = createAsyncThunk(
    'applications/getApplicationForJob',
    async (id, thunkAPI) => {
        try {
            return await applicationService.getApplicationsForJob(id)
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
        SET_APPLICATION(state) {
            state.application = null;
            state.applications = []
            state.isErrorApp = false
            state.isSuccessApp = false
            state.isLoadingApp = false
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(getApplicationForUser.pending, (state) => {
                state.isLoadingApp = true
            })
            .addCase(getApplicationForUser.fulfilled, (state, action) => {
                state.isLoadingApp = false;
                state.isSuccessApp = true;
                state.isErrorApp = false;
                state.applications = action.payload;
            })
            .addCase(getApplicationForUser.rejected, (state, action) => {
                state.isLoadingApp = false
                state.isSuccessApp = false
                state.isErrorApp = true
                state.message = action.payload
                toast.error(action.payload)
            })
            .addCase(createNewApplication.pending, (state) => {
                state.isLoadingApp = true
            })
            .addCase(createNewApplication.fulfilled, (state, action) => {
                state.isLoadingApp = false
                state.isSuccessApp = true
                state.isErrorApp = false
                state.applications.push(action.payload)
                toast.success('Application submitted successfully')

            })
            .addCase(createNewApplication.rejected, (state, action) => {
                state.isLoadingApp = false
                state.isSuccessApp = false
                state.isErrorApp = true
                state.message = action.payload
                toast.error(action.payload)
            })
            .addCase(getApplicationForJob.pending, (state) => {
                state.isLoadingApp = true
            })
            .addCase(getApplicationForJob.fulfilled, (state, action) => {
                state.isLoadingApp = false;
                state.isSuccessApp = true;
                state.isErrorApp = false;
                state.applications = action.payload;
            })
            .addCase(getApplicationForJob.rejected, (state, action) => {
                state.isLoadingApp = false
                state.isSuccessApp = false
                state.isErrorApp = true
                state.message = action.payload
                toast.error(action.payload)
            })

    }
})

export const { SET_APPLICATION } = applicationSlice.actions


export const selectIsLoading = (state) => state.application.isLoadingApp


export default applicationSlice.reducer

