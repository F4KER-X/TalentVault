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
        if (response.statusText === 'OK') {
            toast.success("Registered successfully")
        }
        return response.data
    } catch (err) {
        const message = (
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString()
        toast.error(message)
    }
}

//login user
export const loginUser = async (userData) => {

    try {
        const response = await axios.post(`${BACKEND_URL}/auth/login`, userData)
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
    }
}

//logout user
export const logoutUser = async () => {

    try {
        await axios.get(`${BACKEND_URL}/auth/logout`)

    } catch (err) {
        const message = (
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString()
        toast.error(message)
    }
}


//login status
export const getLoginStatus = async () => {

    try {
        const response = await axios.get(`${BACKEND_URL}/auth/loggedinStatus`)
        return response.data

    } catch (err) {
        const message = (
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString()
        toast.error(message)
    }
}