//this is for the routing, aka connecting pages together
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//importing the components
import Header from "./components/Header";

//importing the pages
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ApplicantRegister from "./pages/ApplicantRegister";
import RecruiterRegister from "./pages/RecruiterRegister";
import JobPosting from "./pages/JobPosting";
import Landing from "./pages/Landing";
import Error from "./pages/Error";

//here i am setting up the routes, connecting the pages together

// localhost will open up the about page, all you will see is the header (no css yet)
//localhost:3000/login will open login page
//localhost:3000/register will open register page
//localhost:3000/dashboard will open dashboard page
function App() {
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
