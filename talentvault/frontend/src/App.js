import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RecruiterRegisterPage from "./pages/RecruiterRegisterPage";
import ApplicantRegisterPage from "./pages/ApplicantRegisterPage";
import JobPosting from "./pages/JobPosting";
import LandingPage from "./pages/LandingPage";
import Error from "./pages/Error";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Test from "./pages/test";
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
import ProfileLogicPage from "./pages/ProfileLogicPage";
import FullJobDetails from "./pages/FullJobDetails";
import CreateJob from "./pages/createJob";
import Dashboard from "./pages/Dashboard";

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
    async function userRole() {
      const status = await getUserRole();
      dispatch(SET_ROLE(status.role));
      dispatch(SET_ID(status.id));
      dispatch(SET_COMPANY(status.companyName));
    }
    if (isLoggedIn) userRole();
  }, [dispatch, isLoggedIn]);

  return (
    <BrowserRouter>
      <ToastContainer pauseOnHover={false} autoClose={1000} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/applicantregister" element={<ApplicantRegisterPage />} />
        <Route path="/recruiterregister" element={<RecruiterRegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobposting" element={<JobPosting />} />
        <Route path="/fulljobdetails" element={<FullJobDetails/>} />
        <Route path="/profile" element={<ProfileLogicPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
