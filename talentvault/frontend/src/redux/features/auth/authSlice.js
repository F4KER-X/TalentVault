import { createSlice } from '@reduxjs/toolkit'

//const name = JSON.parse(localStorage.getItem("name"))
//const photo = JSON.parse(localStorage.getItem("photo"))


const initialState = {

    isLoggedIn: false,
    name: "",
    photo: "",
    role: '',
    id: '',
    companyName: '',
    email: ''
}
const authSlide = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        SET_LOGIN(state, action) {
            state.isLoggedIn = action.payload
        },
        SET_NAME(state, action) {
            state.name = action.payload
        },
        SET_PHOTO(state, action) {
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
        },
        SET_EMAIL(state, action) {
            state.email = action.payload
        },
        SET_CLEAR(state) {
            state.isLoggedIn = false
            state.name = ""
            state.photo = ""
            // state.role = ''
            state.id = ''
            state.companyName = ''
            state.email = ''
        }
    }
})

export const { SET_LOGIN, SET_NAME, SET_PHOTO, SET_ROLE, SET_ID, SET_COMPANY, SET_EMAIL, SET_CLEAR } = authSlide.actions


export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectName = (state) => state.auth.name
export const selectPhoto = (state) => state.auth.photo
export const selectRole = (state) => state.auth.role
export const selectID = (state) => state.auth.id
export const selectCompany = (state) => state.auth.companyName
export const selectEmail = (state) => state.auth.email



export default authSlide.reducer