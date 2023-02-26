import axios from "axios"


// add job
const addJob = async (formData) => {
    const response = await axios.post('/jobs', formData)
    return response.data
}


//get all jobs
const getJobs = async () => {
    const response = await axios.get('/jobs')
    return response.data
}

const jobService = {
    addJob,
    getJobs
}

export default jobService
