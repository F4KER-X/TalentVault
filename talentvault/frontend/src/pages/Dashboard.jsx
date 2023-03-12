import React, { useState } from "react";
import Navbar from "../components/Navbar";
import UseRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { useEffect } from "react";
import { getJobs } from "../redux/features/job/jobSlice";
import Jobs from "../components/Jobs";
import Loader from "../components/Loader";

function Dashboard() {
  UseRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { jobs, isLoading, isError, message } = useSelector(
    (state) => state.job
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getJobs());
    }
    if (isError) {
      console.log(message);
    }
  }, [dispatch, isError, isLoggedIn, message]);

  return (
    <>
      {isLoading && <Loader />}

      <div>
        <Navbar />

        <div className="top-container">
          <h2>Explore Our Jobs!</h2>
        </div>
      </div>

      <div className="container">
        <div>
          {jobs.map((job) => (
            <Jobs key={job._id} job={job} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
