import Wrapper from "../assets/styling/WrapperJobs";
import {
  FaBriefcase,
  FaRegBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRole } from "../redux/features/auth/authSlice";

//job status
function JobStatus({ isOpen }) {
  return (
    <div className={`job-status ${isOpen ? "open" : "closed"}`}>
      {isOpen ? "Open" : "Closed"}
    </div>
  );
}
const Jobs = ({ job }) => {

  const role = useSelector(selectRole);

  return (
    <>
      <Wrapper>
        <div className="form">
          <div className="top">
            <h4 className="form-title">{job?.jobTitle}</h4>
          </div>

          <h6 className="title" style={{ color: "#4540db" }}>{job?.companyName} </h6>

          <div>
            <div className="form-control">
              <FaMapMarkerAlt /> {job?.jobLocation?.city}, {job?.jobLocation?.province}
            </div>
            <div className="form-control">
              <FaRegBuilding /> {job?.workType}
            </div>

            <div className="form-control">
              <FaBriefcase /> {job?.jobType}
            </div>
            <div>
              <JobStatus isOpen={job?.status === 'Open' ? true : false} />
            </div>
            <div className="buttons-2">
              {/* <div href="" className="btn">
                Apply <FaExternalLinkAlt className="apply" size={15} />
              </div> */}
              <div>
                {/* More Info <FiInfo className="info" size={15} /> */}
                <Link className="btn" to={`/job/${job?._id}`} style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>More Info <FiInfo className="info" size={15} /></Link>
              </div>
              <div >
                {role === "recruiter" && (
                  <Link className="btn" to={`/application/${job?._id}`} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "10px",
                    // optional: set the height of the parent div to make it take up the full height of the viewport
                  }}>View Applications </Link>
                )}
              </div>

            </div>
          </div>
          <div className="form-group"></div>
        </div>
      </Wrapper>
    </>
  );
};
export default Jobs;