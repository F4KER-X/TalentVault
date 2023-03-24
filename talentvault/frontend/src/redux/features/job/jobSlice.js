import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import jobServices from "./jobServices";

const initialState = {
  job: null,
  jobs: [],
  isErrorJob: false,
  isSuccessJob: false,
  isLoadingJob: false,
  message: "",
};

//create new job
export const addJob = createAsyncThunk(
  "jobs/create",
  async (formData, thunkAPI) => {
    try {
      return await jobServices.addJob(formData);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get all jobs
export const getJobs = createAsyncThunk("jobs/getAll", async (_, thunkAPI) => {
  try {
    return await jobServices.getJobs();
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});



//delete one job
export const deleteJob = createAsyncThunk(
  "jobs/delete",
  async (id, thunkAPI) => {
    try {
      return await jobServices.deleteJob(id);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get one job
export const getOneJob = createAsyncThunk(
  "jobs/getJob",
  async (id, thunkAPI) => {
    try {
      return await jobServices.getOneJob(id);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//edit job
export const editJob = createAsyncThunk(
  "jobs/editJob",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await jobServices.editJob(id, formData);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getJobUser = createAsyncThunk(
  'jobs/getSome',
  async (_, thunkAPI) => {
    try {
      return await jobServices.getJobsPerUser()
    } catch (err) {
      const message = (
        err.response && err.response.data && err.response.data.message
      ) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    SET_JOB(state) {
      state.job = null;
      state.jobs = []
      state.isErrorJob = false
      state.isSuccessJob = false
      state.isLoadingJob = false
      state.message = ""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addJob.pending, (state) => {
        state.isLoadingJob = true;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.isLoadingJob = false;
        state.isSuccessJob = true;
        state.isErrorJob = false;
        state.jobs.push(action.payload);
        toast.success("Job created successfully");
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.isLoadingJob = false;
        state.isSuccessJob = false;
        state.isErrorJob = true;
        state.messageJob = action.payload;
        toast.error(action.payload);
      })
      .addCase(getJobs.pending, (state) => {
        state.isLoadingJob = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.isLoadingJob = false;
        state.isSuccessJob = true;
        state.isErrorJob = false;
        state.jobs = action.payload;
      })
      .addCase(addJob.rejected, (state, action) => {
        state.isLoadingJob = false;
        state.isSuccessJob = false;
        state.isErrorJob = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoadingJob = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isLoadingJob = false;
        state.isSuccessJob = true;
        state.isErrorJob = false;
        toast.success("Job deleted successfully");
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.isLoadingJob = false;
        state.isSuccessJob = false;
        state.isErrorJob = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getOneJob.pending, (state) => {
        state.isLoadingJob = true;
      })
      .addCase(getOneJob.fulfilled, (state, action) => {
        state.isLoadingJob = false;
        state.isSuccessJob = true;
        state.isErrorJob = false;
        state.job = action.payload
      })
      .addCase(getOneJob.rejected, (state, action) => {
        state.isLoadingJob = false;
        state.isSuccessJob = false;
        state.isErrorJob = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(editJob.pending, (state) => {
        state.isLoadingJob = true;
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.isLoadingJob = false;
        state.isSuccessJob = true;
        state.isErrorJob = false;
        state.message = action.payload;
        toast.success(action.payload.message)
      })
      .addCase(editJob.rejected, (state, action) => {
        state.isLoadingJob = false;
        state.isSuccessJob = false;
        state.isErrorJob = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getJobUser.pending, (state) => {
        state.isLoadingJob = true
      })
      .addCase(getJobUser.fulfilled, (state, action) => {
        state.isLoadingJob = false
        state.isSuccessJob = true
        state.isErrorJob = false
        state.jobs = action.payload
      })
      .addCase(getJobUser.rejected, (state, action) => {
        state.isLoadingJob = false
        state.isSuccessJob = false
        state.isErrorJob = true
        state.message = action.payload
        toast.error(action.payload)
      })
  },
});

export const { SET_JOB } = jobSlice.actions;

export const selectIsLoading = (state) => state.job.isLoadingJob;

export default jobSlice.reducer;
