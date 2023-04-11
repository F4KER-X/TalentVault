import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Jobs from "../components/Jobs";
import Loader from "../components/Loader";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { useEffect } from "react";
import { getJobUser } from "../redux/features/job/jobSlice";
import UseRedirectNotAuthorizedRole from "../hook/useRedirectNotAuthorizedRole";
import UseRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";

function ViewJobs() {
  UseRedirectLoggedOutUser();
  UseRedirectNotAuthorizedRole("/dashboard", "recruiter");

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [currentPage, setCurrentPage] = useState(1);

  const getPrevious = () => {
    setCurrentPage(currentPage - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getNext = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageNumber = (number) => {
    setCurrentPage(number);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { jobs, isLoadingJob } = useSelector((state) => state.job);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getJobUser());
    }
  }, [dispatch, isLoggedIn]);

  const jobsPerPage = 10;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(jobs.length / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return isLoggedIn ? (
    <>
      {isLoadingJob && <Loader />}
      <div>
        <Navbar />
        <div className="top-container">
          <h2>Your job postings</h2>
        </div>
      </div>

      <div className="pagination-container">
        {jobs?.length === 0 ? (
          <h5>No jobs found. Create a new one!</h5>
        ) : (
          <div>
            <div>
              {currentJobs.map((job, index) => (
                <Jobs key={index} job={job} />
              ))}
            </div>
            <div className="pagination">
              <button
                className="prev"
                disabled={currentPage === 1 ? true : false}
                onClick={getPrevious}
              >
                Previous
              </button>

              {pageNumbers.map((number) => (
                <button
                  id="pageButton"
                  key={number}
                  className={currentPage === number ? "active" : ""}
                  onClick={() => pageNumber(number)}
                >
                  {number}
                </button>
              ))}

              <button
                className="next"
                disabled={currentPage === totalPages ? true : false}
                onClick={getNext}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  ) : (
    <></>
  );
}

export default ViewJobs;
