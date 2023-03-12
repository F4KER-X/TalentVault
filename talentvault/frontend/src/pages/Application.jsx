import Navbar from "../components/Navbar";
import UseRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { useEffect } from "react";
import { getJobs } from "../redux/features/job/jobSlice";
import { getApplicationForUser } from "../redux/features/application/applicationSlice";
// import Jobs from "../components/Jobs";
import Applications from "../components/Applications";
import Loader from "../components/Loader";


function Application() {
  UseRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { applications, isLoading, isError, message } = useSelector(
    (state) => state.job
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getApplicationForUser());
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
          <h2>Here are the jobs you've applied to</h2>
        </div>
      </div>

      <div className="container">
        <div>
            {/* {applications.map((job) => (
                <Applications key={job._id} job={job} />
            ))} THIS SHOULD BE UNCOMMENTED BUT DOESNT WORK*/} 
        </div>
      </div>
    </>
  );
}

export default Application;