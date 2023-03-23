import axios from "axios"

// add job
const createNewApplication = async (id) => {
    const response = await axios.post('/applications/')
    return response.data
}

const jobService = {
    createNewApplication,
}

export default jobService
