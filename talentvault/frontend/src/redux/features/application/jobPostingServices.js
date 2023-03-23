import axios from "axios"

// add job
const getApplicationForJob = async (id) => {
    const response = await axios.get('/applications/' + id)
    return response.data
}

const jobService = {
    getApplicationForJob,
}

export default jobService