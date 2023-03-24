import Navbar from "../components/Navbar";
import UseRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import {
  selectID,
  selectIsLoggedIn,
  selectRole,
} from "../redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import { getApplicationForUser } from "../redux/features/application/applicationSlice";

import Loader from "../components/Loader";
import Applications from "../components/Applications";
import UseRedirectNotAuthorizedRole from "../hook/useRedirectNotAuthorizedRole";

function Application() {
  UseRedirectNotAuthorizedRole("/job/my-jobs", "applicant");
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

  const { applications, isLoadingApp } = useSelector(
    (state) => state.application
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getApplicationForUser());
    }
  }, [dispatch, isLoggedIn]);

  const jobsPerPage = 10;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = applications.slice(indexOfFirstJob, indexOfLastJob);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(applications.length / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  const totalPages = Math.ceil(applications.length / jobsPerPage);

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
              {currentJobs.map((application, index) => (
                <Applications key={index} application={application} />
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
  );
}

export default Application;
