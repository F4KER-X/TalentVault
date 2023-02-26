import { createSlice } from '@reduxjs/toolkit'

const name = JSON.parse(localStorage.getItem("name"))
const photo = JSON.parse(localStorage.getItem("photo"))


const initialState = {

    isLoggedIn: false,
    name: name ? name : "",
    user: {
        firstName: "",
        lastName: "",
        companyNamy: "",
        resume: "",
        phoneNumber: "",
        profilePicUrl: "",
    },
    photo: photo ? photo : "",
    role: "",
    id: '',
    companyName: ''
}
const authSlide = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        SET_LOGIN(state, action) {
            state.isLoggedIn = action.payload
        },
        SET_NAME(state, action) {
            localStorage.setItem('name', JSON.stringify(action.payload))
            state.name = action.payload
        },
        SET_USER(state, action) {
            const profile = action.payload
            state.user.name = profile.firstName
            state.user.companyNamy = profile.companyNamy
            state.user.phoneNumber = profile.phoneNumber
        },
        SET_PHOTO(state, action) {
            localStorage.setItem('photo', JSON.stringify(action.payload))
            state.photo = action.payload
        },
        SET_ROLE(state, action) {
            state.role = action.payload
        },
        SET_ID(state, action) {
            state.id = action.payload
        },
        SET_COMPANY(state, action) {
            state.companyName = action.payload
        }
    }
})

export const { SET_LOGIN, SET_NAME, SET_USER, SET_PHOTO, SET_ROLE, SET_ID, SET_COMPANY } = authSlide.actions


export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectName = (state) => state.auth.name
export const selectUser = (state) => state.auth.user
export const selectPhoto = (state) => state.auth.photo
export const selectRole = (state) => state.auth.role
export const selectID = (state) => state.auth.id
export const selectCompany = (state) => state.auth.companyName


export default authSlide.reducer