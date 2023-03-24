import axios from "axios"
import { toast } from 'react-toastify'

export const BACKEND_URL = 'http://localhost:3001'

export const validateEmail = (email) => {
    return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
}

//register user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/auth/signup`, userData)

        toast.success("Registered successfully")
        return response.data


    } catch (err) {
        const message = (
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString()
        toast.error(message)
        throw err
    }
}

//login user
export const loginUser = async (userData) => {
    try {
        const response = await axios.post('/auth/login', userData)
        if (response.statusText === 'OK') {
            toast.success("Login successful...")
        } else {
            toast.error("not here")
        }
        return response.data
    } catch (err) {
        const message = (
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString()
        toast.error(message)
        throw err
    }
}

//logout user
export const logoutUser = async () => {

    try {
        await axios.get('/auth/logout')
        toast.success('Logout success')

    } catch (err) {
        const message = (
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString()
        toast.error(message)
        throw err
    }
}


//login status
export const getLoginStatus = async () => {
    try {
        const response = await axios.get(`/auth/loggedinStatus`)
        return response.data
    } catch (err) {
        const message = (
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString()
        toast.error(message)
        throw err
    }
}

//get user role
export const getUserRole = async () => {

    try {
        const response = await axios.get('/user/role')
        return response.data

    } catch (err) {
        const message = (
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString()
        toast.error(message)
        throw err
    }
}

//get profile
export const getUserProfile = async () => {

    try {
        const response = await axios.get('/user')
        return response.data
    } catch (err) {
        const message = (
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString()

        if (message === 'Not authorized') return
        toast.error(message)
        throw err

    }

}


//update profile
export const updateUserInfo = async (formData) => {

    try {
        const response = await axios.patch('/user', formData)
        return response.data
    } catch (err) {
        const message = (
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString()

        if (message === 'Not authorized') return
        toast.error(message)
        throw err

    }

}

export const changePassword = async (formData) => {

    try {
        const response = await axios.patch('/user/updatePassword', formData)
        return response.data
    } catch (err) {
        const message = (
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString()

        if (message === 'Not authorized') return
        toast.error(message)
    }

}

export const deleteUser = async () => {

    try {
        const response = await axios.delete('/user')
        return response.data
    } catch (err) {
        const message = (
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString()

        if (message === 'Not authorized') return
        toast.error(message)
    }

}



export const uploadPhoto = async (formData) => {

    try {
        const response = await axios.patch('/user/upload/profile', formData)
        return response.data
    } catch (err) {
        const message = (
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString()

        if (message === 'Not authorized') return
        toast.error(message)
    }

}

export const uploadFile = async (formData) => {

    try {
        const response = await axios.patch('/user/upload/file', formData)
        return response.data
    } catch (err) {
        const message = (
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString()

        if (message === 'Not authorized') return
        toast.error(message)
    }

}