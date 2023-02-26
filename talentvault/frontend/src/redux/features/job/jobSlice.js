import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import jobService from './jobServices'

const initialState = {
    job: null,
    jobs: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//create new job
export const addJob = createAsyncThunk(
    'jobs/create',
    async (formData, thunkAPI) => {
        try {
            return await jobService.addJob(formData)
        } catch (err) {
            const message = (
                err.response && err.response.data && err.response.data.message
            ) || err.message || err.toString()
            console.log(message);
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//get all jobs
export const getJobs = createAsyncThunk(
    'jobs/getAll',
    async (_, thunkAPI) => {
        try {
            return await jobService.getJobs()
        } catch (err) {
            const message = (
                err.response && err.response.data && err.response.data.message
            ) || err.message || err.toString()
            console.log(message);
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {

        calc(state, action) {

        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(addJob.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addJob.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.jobs.push(action.payload)
                toast.success('Job created successfully')
            })
            .addCase(getJobs.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            })
            .addCase(getJobs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getJobs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.jobs = action.payload
            })
            .addCase(addJob.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            })


    }
})

export const { calc } = jobSlice.actions

export const selectIsLoading = (state) => state.job.isLoading


export default jobSlice.reducer