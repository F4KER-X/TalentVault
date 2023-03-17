import axios from "axios";

// add job
const addJob = async (formData) => {
  const response = await axios.post("/jobs", formData);
  return response.data;
};

//get all jobs
const getJobs = async () => {
  const response = await axios.get("/jobs");
  return response.data;
};

//delete job
const deleteJob = async (id) => {
  const response = await axios.delete("/jobs/" + id);
  return response.data;
};

//get one job
const getOneJob = async (id) => {
  const response = await axios.get('/jobs/' + id)
  return response.data
}

//edit = job
const editJob = async (id, formData) => {
  const response = await axios.patch('/jobs/' + id, formData)
  return response.data
}

const getJobsPerUser = async () => {
  const response = await axios.get("/jobs/user-jobs");
  return response.data;
};

const jobServices = {
  addJob,
  getJobs,
  deleteJob,
  getOneJob,
  editJob,
  getJobsPerUser
};

export default jobServices;
