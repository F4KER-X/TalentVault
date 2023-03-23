import { configureStore } from "@reduxjs/toolkit"
import authReducer from './features/auth/authSlice'
import jobReducer from './features/job/jobSlice'
import applicationReducer from './features/application/applicationSlice'
import applicationAppCreationReducer from './features/application/createApplicationSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        job: jobReducer,
        application: applicationReducer,
        applicationAppCreationReducer
    }
})