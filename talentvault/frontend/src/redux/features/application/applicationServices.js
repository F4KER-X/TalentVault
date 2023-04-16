import axios from "axios"

// get applications for specifc user
const getApplicationForUser = async () => {
    const response = await axios.get('/applications')
    return response.data
}

// apply for an application
const createNewApplication = async (formData) => {
    const response = await axios.post('/applications', formData)
    return response.data
}

//get applications per job
const getApplicationsForJob = async (id) => {
    const response = await axios.get(`/applications/job/${id}`)
    return response.data
}

const editApplicationStatus = async (id, formData) => {
    const response = await axios.patch('/applications/' + id, formData)
    return response.data

}


const applicationService = {
    getApplicationForUser,
    createNewApplication,
    getApplicationsForJob,
    editApplicationStatus
}

export default applicationService