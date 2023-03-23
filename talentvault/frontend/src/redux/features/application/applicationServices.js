import axios from "axios"

// get applications for specifc user
const getApplicationForUser = async (id) => {
    const response = await axios.get(`/applications/${id}`)
    return response.data
}

// apply for an application
const createNewApplication = async (formData) => {
    const response = await axios.post('/applications/', formData)
    return response.data
}

const jobService = {
    getApplicationForUser,
    createNewApplication
}

export default jobService

