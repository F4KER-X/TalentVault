import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import { getJobs } from "../redux/features/job/jobSlice";
import Jobs from "../components/Jobs";
import Loader from "../components/Loader";
import "../index.css";
import UseRedirectNotAuthorizedRole from "../hook/useRedirectNotAuthorizedRole";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import UseRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";

function Dashboard() {
  UseRedirectLoggedOutUser();
  UseRedirectNotAuthorizedRole("/job/my-jobs", "applicant");

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [currentPage,setCurrentPage]=useState(1);
  const [searchResults, setSearchResults] = useState([])

  const { jobs, isLoadingJob } = useSelector((state) => state.job);


  useEffect(() => {
      if (isLoggedIn) {
      dispatch(getJobs());
    }
  }, [dispatch, isLoggedIn]); // role]);

  const jobsToDisplay = searchResults.length > 0 ? searchResults : jobs;

  const jobsPerPage = 4;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  const jobsToDisplayPaginated= jobsToDisplay.slice(indexOfFirstJob, indexOfLastJob);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(jobs.length / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  const totalPages = Math.ceil(jobs.length / jobsPerPage);


  return isLoggedIn ? (
    <>
      {isLoadingJob && <Loader />}
      <div>
        <Navbar />
        <div className="top-container">
          <h2>Find Your Dream Job!</h2>
          <h4>It's only a click away</h4>
        </div>
      </div>

      <div>     
        <SearchBar jobs={jobs} setSearchResults={setSearchResults} />
      </div>


      <div className="pagination-container">
        <div>
         {jobsToDisplayPaginated.map((job) => (
          <Jobs key={job._id} job={job} />
          ))}
        </div> 

        <Pagination
        jobsPerPage={jobsPerPage}
        totalJobs={jobsToDisplay.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        />
      </div> 
    </>
  ) : (
    <></>
  );
}

export default Dashboard;
