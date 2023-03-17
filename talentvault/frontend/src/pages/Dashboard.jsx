import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import { getJobs } from "../redux/features/job/jobSlice";
import Jobs from "../components/Jobs";
import Loader from "../components/Loader";
import "../index.css";
import UseRedirectNotAuthorizedRole from "../hook/useRedirectNotAuthorizedRole";

function Dashboard() {
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

  const { jobs, isLoading, isError, message } = useSelector(
    (state) => state.job
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getJobs());
    }
    if (isError) {
    }
  }, [dispatch, isError, isLoggedIn, message]);

  const jobsPerPage = 10;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(jobs.length / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return (
    <>
      {isLoading && <Loader />}

      <div>
        <Navbar />

        <div className="top-container">
          <h2>Explore Our Jobs!</h2>
        </div>
      </div>

      <div className="pagination-container">
        <div>
          {currentJobs.map((job) => (
            <Jobs key={job._id} job={job} />
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
    </>
  );
}

export default Dashboard;
