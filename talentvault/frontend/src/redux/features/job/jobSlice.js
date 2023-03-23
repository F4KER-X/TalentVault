import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import jobServices from "./jobServices";

const initialState = {
  job: null,
  jobs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
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

export const clearAllJobs = () => {
  initialState.job = { ...initialState.job, jobs: [] };
}

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    SET_JOB(state) {
      state.job = null;
      state.jobs = []
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.jobs.push(action.payload);
        toast.success("Job created successfully");
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.jobs = action.payload;
      })
      .addCase(addJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Job deleted successfully");
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload.message);
      })
      .addCase(getOneJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.job = action.payload
      })
      .addCase(getOneJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
        toast.success(action.payload.message)
      })
      .addCase(editJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getJobUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getJobUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.jobs = action.payload
      })
      .addCase(getJobUser.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
  },
});

export const { SET_JOB } = jobSlice.actions;

export const selectIsLoading = (state) => state.job.isLoading;

export default jobSlice.reducer;
