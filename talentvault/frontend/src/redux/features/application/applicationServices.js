import axios from "axios"

// add job
const getApplicationForUser = async (formData) => {
    const response = await axios.post('/:id', formData)
    return response.data
}

const jobService = {
    getApplicationForUser,
}

export default jobService
