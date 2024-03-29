import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import Error from "./pages/ErrorPage";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateJob from "./pages/createJob";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/profile";
import JobsExtended from "./components/JobsExtended";
import Application from './pages/Application';
import ViewJobs from "./pages/ViewJobs";
import { useEffect } from "react";
import { getLoginStatus } from "./redux/features/auth/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import ViewApplications from "./pages/ViewApplications"
import ReportBug from "./pages/reportbug";
axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  //get login status
  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);


  return (
    <BrowserRouter>
      <ToastContainer pauseOnHover={false} autoClose={1000} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/job/:id" element={<JobsExtended />} />
        <Route path="/application/:id" element={<ViewApplications />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applications/my-applications" element={<Application />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/job/create-job" element={<CreateJob />} />
        <Route path="/job/my-jobs" element={<ViewJobs />} />
        <Route path="/reportbug" element={<ReportBug />} />
        <Route path="*" element={<Error />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
