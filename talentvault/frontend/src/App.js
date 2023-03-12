import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import JobPosting from "./pages/JobPosting";
import LandingPage from "./pages/LandingPage";
import Error from "./pages/Error";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus, getUserRole } from "./redux/features/auth/authService";
import {
  selectIsLoggedIn,
  SET_COMPANY,
  SET_ID,
  SET_LOGIN,
  SET_ROLE,
} from "./redux/features/auth/authSlice";
import CreateJob from "./pages/createJob";
import Dashboard from "./pages/Dashboard";
import JobDetails from "./pages/JobDetails";
import Profile from "./pages/profile";
import JobsExtended from "./components/JobsExtended";
import About from "./pages/About";
import Test from './pages/test'
import ViewJobs from "./pages/ViewJobs";

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

  //get user role
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    async function userData() {
      if (isLoggedIn) {
        const status = await getUserRole();
        dispatch(SET_ROLE(status.role));
        dispatch(SET_ID(status.id));
        dispatch(SET_COMPANY(status.companyName));
      }
    }
    userData()
  }, [dispatch, isLoggedIn]);

  return (
    <BrowserRouter>
      <ToastContainer pauseOnHover={false} autoClose={1000} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/job/:id" element={<JobsExtended />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobposting" element={<JobPosting />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<Error />} />
        <Route path="/ViewJobs" element={<ViewJobs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
