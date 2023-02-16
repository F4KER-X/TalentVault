
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";



import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ApplicantRegister from "./pages/ApplicantRegister";
import RecruiterRegister from "./pages/RecruiterRegister";
import JobPosting from "./pages/JobPosting";
import Landing from "./pages/Landing";
import Error from "./pages/Error";


function App() {
  return (
    <>
      <Router>
        <div className="container">
         
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
