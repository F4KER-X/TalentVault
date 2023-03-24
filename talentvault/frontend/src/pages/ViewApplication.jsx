import Navbar from "../components/Navbar";
import UseRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import {
  selectID,
  selectIsLoggedIn,
  selectRole,
} from "../redux/features/auth/authSlice";
import { useEffect } from "react";
import { getJobs } from "../redux/features/job/jobSlice";
import { getApplicationForJob } from "../redux/features/application/ViewApplicationSlice";
import { useParams } from "react-router-dom";
// import Jobs from "../components/Jobs";

import Loader from "../components/Loader";
import Applications from "../components/Applications";

function ViewApplication() {
  //UseRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const {jobId} = useParams();
  
  const { applications, isLoading, isError, message } = useSelector(
    (state) => state.application
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getApplicationForJob(jobId));
      console.log(jobId);
      console.log(applications);
    }
  }, [dispatch, isLoggedIn, jobId]);

  return (
    <>
      {isLoading && <Loader />}
      <div>
        <Navbar />

        <div className="top-container">
          <h2>Applications</h2>
        </div>
      </div>

      <div className="container">
        <div>
          {applications.map((application, index) => (
            <Applications key={index} application={application} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewApplication;
