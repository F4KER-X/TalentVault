import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RecruiterRegisterPage from "./pages/RecruiterRegisterPage";
import ApplicantRegisterPage from "./pages/ApplicantRegisterPage";
import JobPosting from "./pages/JobPosting";
import LandingPage from "./pages/LandingPage";
import Error from "./pages/Error";
import axios from "axios";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Test from './pages/test'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getLoginStatus } from './services/authService'
import { SET_LOGIN } from './redux/features/auth/authSlice'
import ProfileLogicPage from "./pages/ProfileLogicPage";



axios.defaults.baseURL = 'https://talentvault-api.onrender.com';
axios.defaults.withCredentials = true;


function App() {
  const dispatch = useDispatch()

  //get login status
  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus()
      dispatch(SET_LOGIN(status))
    }
    loginStatus()
  }, [dispatch])

  return (

    <BrowserRouter>
      <ToastContainer pauseOnHover={false} autoClose={1000} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/applicantregister" element={<ApplicantRegisterPage />} />
        <Route path="/recruiterregister" element={<RecruiterRegisterPage />} />
        <Route path="/jobposting" element={<JobPosting />} />
        <Route path="/profile" element={<ProfileLogicPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<Error />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
