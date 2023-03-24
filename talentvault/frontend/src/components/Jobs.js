import Wrapper from "../assets/styling/jobs";
import {
  FaBriefcase,
  FaRegBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";
const Jobs = ({ job }) => {
  function JobStatus({ isOpen }) {
    return (
      <div className={`job-status ${isOpen ? "open" : "closed"}`}>
        {isOpen ? "Open" : "Closed"}
      </div>
    );
  }
  return (
    <>
      <Wrapper>
        <div className="form">
          <div className="top">
            <h4 className="form-title">{job?.jobTitle}</h4>
          </div>

          <h6 className="title">{job?.companyName} </h6>

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
                <Link className="btn" to={`/job/${job?._id}`}>More Info <FiInfo className="info" size={15} /></Link>
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
