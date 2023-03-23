import axios from "axios"

// add job
const getApplicationForUser = async (id) => {
    const response = await axios.get('/applications/' + id)
    return response.data
}

const jobService = {
    getApplicationForUser,
}

export default jobService

