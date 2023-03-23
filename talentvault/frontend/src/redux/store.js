import { combineReducers } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from './features/auth/authSlice';
import jobReducer from './features/job/jobSlice';
import applicationReducer from './features/application/applicationSlice'


const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", 'job', 'application'], // put the reducers that you want to persist here
};

const rootReducer = combineReducers({
    auth: authReducer,
    job: jobReducer,
    application: applicationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
