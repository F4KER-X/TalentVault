import { createSlice } from '@reduxjs/toolkit'

const name = JSON.parse(localStorage.getItem("name"))

const initialState = {

    isLoggedIn: false,
    name: name ? name : "",
    user: {
        name: "",
        phoneNumber: "",
        photo: "",
    },
    userId: ""
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
        }
    }
})

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlide.actions


export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectName = (state) => state.auth.name
export const selectUser = (state) => state.auth.user

export default authSlide.reducer