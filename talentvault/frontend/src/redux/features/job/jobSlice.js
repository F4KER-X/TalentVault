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

//delete one job
export const deleteJob = createAsyncThunk(
    'jobs/delete',
    async (id, thunkAPI) => {
        try {
            return await jobService.deleteJob(id)
        } catch (err) {
            const message = (
                err.response && err.response.data && err.response.data.message
            ) || err.message || err.toString()
            console.log(message);
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//get one job
export const getOneJob = createAsyncThunk(
    'jobs/getJob',
    async (id, thunkAPI) => {
        try {
            return await jobService.getOneJob(id)
        } catch (err) {
            const message = (
                err.response && err.response.data && err.response.data.message
            ) || err.message || err.toString()
            console.log(message);
            return thunkAPI.rejectWithValue(message)
        }
    }
)


//edit job
export const editJob = createAsyncThunk(
    'jobs/editJob',
    async ({ id, formData }, thunkAPI) => {
        try {
            return await jobService.editJob(id, formData)
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
            .addCase(deleteJob.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteJob.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                toast.success('Job deleted successfully')
            })
            .addCase(deleteJob.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            })
            .addCase(getOneJob.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOneJob.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                toast.success('Job updated successfully ')
            })
            .addCase(getOneJob.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            })
            .addCase(editJob.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editJob.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.job = action.payload
            })
            .addCase(editJob.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            })
    }
})

export const { } = jobSlice.actions

export const selectIsLoading = (state) => state.job.isLoading


export default jobSlice.reducer