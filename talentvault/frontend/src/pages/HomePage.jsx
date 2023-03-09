import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Jobs from "../components/Jobs";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import UserRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import getUserProfile from "../redux/features/auth/authService";
import getJobs from "../redux/features/job/jobServices";
import axios from "axios";
function HomePage() {
  UserRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    getJobs()
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div>
        <Navbar />
        <div className="top-container">
          <h2>Explore Our Jobs!</h2>
        </div>
      </div>

      <div className="container">
        <div>
          <ul className="job-list full">
            {jobs.map((job) => (
              <li key={job.id}>{job.title}</li>
            ))}
            {/* <Jobs />
            <li>
              <Jobs />
            </li>

            <li>
              <Jobs />
            </li>

            <li>
              <Jobs />
            </li>

            <li>
              <Jobs />
            </li>
            <li>
              <Jobs />
            </li> */}
          </ul>

          <div className="pagination-container">
            <nav className="pagination">
              <ul>
                <li>
                  <a href="#" className="current-page">
                    1
                  </a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li className="blank">...</li>
                <li>
                  <a href="#">10</a>
                </li>
              </ul>
            </nav>

            <nav className="pagination-next-prev">
              <ul>
                <li>
                  <a href="#" className="prev">
                    Previous
                  </a>
                </li>
                <li>
                  <a href="#" className="next">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
