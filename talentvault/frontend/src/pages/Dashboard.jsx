//this is a skeleton of a react component. you will add detail and make changes inside the return

import Navbar from "../components/Navbar";
import Jobs from "../components/Jobs";
import Sidebar from "../components/SideBar";
function Dashboard() {
  return (
    <>
      <div>
        <Navbar />
        <div className="dashb">
          <Jobs />
          <Jobs />
        </div>
      </div>

      <div></div>
    </>
  );
}

export default Dashboard;
