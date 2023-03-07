import Logo from "../components/Logo";
import { FaBriefcase, FaRegBuilding, FaMapMarkerAlt } from "react-icons/fa";
import Jobs from "../components/Jobs";
import Pagination from "../components/Pagination";
function JobBoard() {
  
  return (
    <>
      <div>
        <div className="top-container">
          <Logo />
          <h2>Explore Our Jobs!</h2>
        </div>
      </div>

      <div className="container">
        <div>
          <ul className="job-list full">
            <Jobs />
            <li>
              <Jobs />
            </li>

            <li>
              <Jobs />
            </li>
			<l1>
				<Jobs/>
			</l1>
          </ul>

        <Pagination>

        </Pagination>
        </div>
      </div>
    </>
  );
}

export default JobBoard;
