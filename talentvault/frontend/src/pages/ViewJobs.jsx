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
import Pagination from "../components/Pagination";

function ViewJobs() {
  UseRedirectLoggedOutUser();
  UseRedirectNotAuthorizedRole("/dashboard", "recruiter");

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [currentPage, setCurrentPage] = useState(1);

  const { jobs, isLoadingJob } = useSelector((state) => state.job);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getJobUser());
    }
  }, [dispatch, isLoggedIn]);

  const jobsToDisplay = jobs;

  const jobsPerPage = 4;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  const jobsToDisplayPaginated = jobsToDisplay.slice(
    indexOfFirstJob,
    indexOfLastJob
  );

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
              {jobsToDisplayPaginated.map((job) => (
                <Jobs key={job._id} job={job} />
              ))}
            </div>

            <Pagination
              jobsPerPage={jobsPerPage}
              totalJobs={jobsToDisplay.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </>
  ) : (
    <></>
  );
}

export default ViewJobs;
