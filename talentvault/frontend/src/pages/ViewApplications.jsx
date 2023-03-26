import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import { getApplicationForJob } from "../redux/features/application/applicationSlice";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Applications from "../components/Applications";
import UseRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";

function ViewApplications() {
  UseRedirectLoggedOutUser();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  //=====================pagination====================
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

  const { id } = useParams();
  const { applications, isLoading } = useSelector((state) => state.application);

  

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getApplicationForJob(id));
    }
  }, [dispatch, isLoggedIn, id]);

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

export default ViewApplications;
