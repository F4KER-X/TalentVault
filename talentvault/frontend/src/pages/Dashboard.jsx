//this is a skeleton of a react component. you will add detail and make changes inside the return

import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import UseRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { useEffect } from "react";
import { getJobs } from "../redux/features/job/jobSlice";
import Jobs from "../components/Jobs";
import Pagination from "../components/Pagination";
function Dashboard() {
  UseRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { jobs, isLoading, isError, message } = useSelector(
    (state) => state.job
  );

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     dispatch(getJobs());
  //   }
  //   if (isError) {
  //     console.log(message);
  //   }
  // }, [dispatch, isError, isLoggedIn, message]);

  return (
    <>
      <div>
        <Navbar />
        <div className="dashb">
          <Jobs />
          <Jobs />
        </div>
        <Pagination></Pagination>
      </div>
    </>
  );
}

export default Dashboard;
