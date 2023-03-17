import React from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Jobs from "../components/Jobs";
import Loader from "../components/Loader";
import { selectID, selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { useEffect } from "react";
import { getJobUser } from "../redux/features/job/jobSlice";
import UseRedirectNotAuthorizedRole from "../hook/useRedirectNotAuthorizedRole";

function ViewJobs() {
  UseRedirectNotAuthorizedRole("/dashboard", "recruiter");

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { jobs, isLoading, isError, message } = useSelector(
    (state) => state.job
  );

  const id = useSelector(selectID);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getJobUser());
    }

    if (isError) {
    }
  }, [dispatch, isError, isLoggedIn, message]);

  return (
    <>
      {isLoading && <Loader />}

      <div>
        <Navbar />
        <div className="top-container">
          <h2>Your job postings</h2>
        </div>
      </div>

      <div className="container">
        {jobs?.length === 0 ? (
          <h5>No jobs found. Create a new one!</h5>
        ) : (
          <div>
            {jobs.map((job, index) =>
              job?.recruiterId === id ? <Jobs key={index} job={job} /> : null
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ViewJobs;
