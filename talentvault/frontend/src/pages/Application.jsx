import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getApplicationForUser } from "../redux/features/application/applicationSlice";
import Loader from "../components/Loader";
import Applications from "../components/Applications";
import UseRedirectNotAuthorizedRole from "../hook/useRedirectNotAuthorizedRole";
import UseRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";
import Pagination from "../components/Pagination";

function Application() {
  // Redirect to login if user is not logged in
  UseRedirectLoggedOutUser();
  UseRedirectNotAuthorizedRole("/job/my-jobs", "applicant");
  // Get applications from redux store
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const { applications, isLoadingApp } = useSelector(
    (state) => state.application
  );

  useEffect(() => {
    dispatch(getApplicationForUser());
  }, [dispatch]);

  const appsToDisplay = applications;

  const appsPerPage = 4;

  const indexOfLastApp = currentPage * appsPerPage;
  const indexOfFirstApp = indexOfLastApp - appsPerPage;

  const appsToDisplayPaginated = appsToDisplay.slice(
    indexOfFirstApp,
    indexOfLastApp
  );

  return (
    <>
      {isLoadingApp && <Loader />}
      <div>
        <Navbar />

        <div className="top-container">
          <h2>Your current applications</h2>
        </div>
      </div>

      <div className="pagination-container">
        {applications?.length === 0 ? (
          <h5>No jobs found. Create a new one!</h5>
        ) : (
          <div>
            <div>
              {appsToDisplayPaginated.map((application, index) => (
                <Applications key={index} application={application} />
              ))}
            </div>
            <Pagination
              jobsPerPage={appsPerPage}
              totalJobs={appsToDisplay.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Application;
