import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import { getApplicationForJob } from "../redux/features/application/applicationSlice";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Applications from "../components/Applications";
import UseRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";
import Pagination from "../components/Pagination";

function ViewApplications() {
  // Redirect to login if user is not logged in
  UseRedirectLoggedOutUser();
  const dispatch = useDispatch();
  // Get applications from redux store
  const isLoggedIn = useSelector(selectIsLoggedIn);

  //=====================pagination====================
  const [currentPage, setCurrentPage] = useState(1);

  const { id } = useParams();
  const { applications, isLoading } = useSelector((state) => state.application);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getApplicationForJob(id));
    }
  }, [dispatch, isLoggedIn, id]);

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
      {isLoading && <Loader />}
      <div>
        <Navbar />

        <div className="top-container">
          <h2>Here Are Your Applicants!</h2>
        </div>
      </div>

      <div className="pagination-container">
        {applications?.length === 0 ? (
          <h5>No one has applied to this job yet!</h5>
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

export default ViewApplications;
