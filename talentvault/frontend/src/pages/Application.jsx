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
import { getApplicationForUser } from "../redux/features/application/applicationSlice";
// import Jobs from "../components/Jobs";

import Loader from "../components/Loader";
import Applications from "../components/Applications";


function Application() {
  //UseRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectID);
  const userRole = useSelector(selectRole);

  const { applications, isLoading, isError, message } = useSelector(
    (state) => state.application
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getApplicationForUser(userId));

      console.log(applications);
    }
  }, [dispatch, isLoggedIn, userId]);

  return (
    <>
      {isLoading && <Loader />}
      <div>
        <Navbar />

        <div className="top-container">
          <h2>Here are the jobs you've applied to</h2>
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

export default Application;
