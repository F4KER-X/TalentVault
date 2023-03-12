import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Jobs from "../components/Jobs";
import Loader from "../components/Loader";
import UseRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { useEffect } from "react";
import { getJobs } from "../redux/features/job/jobSlice";

function ViewJobs() {
  UseRedirectLoggedOutUser("/login")
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
        <h2>Your job postings</h2>
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

export default ViewJobs;
