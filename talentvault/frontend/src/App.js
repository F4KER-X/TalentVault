//this is for the routing, aka connecting pages together
import { Route, Routes } from "react-router-dom";

//importing the components


//importing the pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RecruiterRegisterPage from "./pages/RecruiterRegisterPage";
import ApplicantRegisterPage from "./pages/ApplicantRegisterPage";
import JobPosting from "./pages/JobPosting";
import LandingPage from "./pages/LandingPage";
import Error from "./pages/Error";
import axios from "axios";
import Layout from "./components/Layout"
import { UserContextProvider } from "./context/UserContext";
import Test from "./pages/test";

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.withCredentials = true;


function App() {
  return (

    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />


          <Route path="/applicantregister" element={<ApplicantRegisterPage />} />
          <Route path="/recruiterregister" element={<RecruiterRegisterPage />} />
          <Route path="/jobposting" element={<JobPosting />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </UserContextProvider>

  );
}

export default App;
