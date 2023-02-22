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
    <>
      <Router>
        <div className="container">
          {/*  this header tag is how you import and use your component!!
        basically, you just made your own html tag! and you can call it like this.
        mind blown, right ?*/}

          {/* here are the routes */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/applicantregister" element={<ApplicantRegister />} />
            <Route path="/recruiterregister" element={<RecruiterRegister />} />
            <Route path="/jobposting" element={<JobPosting />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
