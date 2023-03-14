import Jobs from "../components/Jobs";
import Pagination from "../components/Pagination";
import { useState,useEffect } from "react";
import { getJobs } from "../redux/features/job/jobSlice";
import UseRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";


const JobBoard=()=> {

  UseRedirectLoggedOutUser("/login");
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


  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  // No of Records to be displayed on each page   
  const [recordsPerPage] = useState(10);

  const indexOfLastRecord = currentPage * recordsPerPage;
  
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    // Records to be displayed on the current page
    const currentRecords = jobs.slice(indexOfFirstRecord, 
    indexOfLastRecord);

    //calculating number of pages
    const nPages = Math.ceil(jobs.length / recordsPerPage)


  return (
    <>
      {isLoading && <Loader />}
      <div>
        <Navbar />

        <div className="top-container">
          <h2>Explore Our Jobs!</h2>
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
 

export default JobBoard;
