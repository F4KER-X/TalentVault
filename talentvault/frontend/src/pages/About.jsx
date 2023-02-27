import Logo from "../components/Logo";
import { FaBriefcase, FaRegBuilding, FaMapMarkerAlt } from "react-icons/fa";
import Jobs from "../components/Jobs";

function About() {
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

          <div className="pagination-container">
            <nav className="pagination">
              <ul>
                <li>
                  <a href="#" className="current-page">
                    1
                  </a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li className="blank">...</li>
                <li>
                  <a href="#">10</a>
                </li>
              </ul>
            </nav>

            <nav className="pagination-next-prev">
              <ul>
                <li>
                  <a href="#" className="prev">
                    Previous
                  </a>
                </li>
                <li>
                  <a href="#" className="next">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
