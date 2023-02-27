import "../index.css";
import Wrapper from "../assets/styling/jobs";
import {
  FaBriefcase,
  FaBuilding,
  FaRegBuilding,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaRegEdit,
  FaCheck,
} from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FiInfo } from "react-icons/fi";
const Jobs = (props) => {
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
            <h4 className="form-title">Insert Job Title Here</h4>
            {/* <FaRegEdit className="edit" size={20} />
            <AiOutlineDelete className="delete" size={20} /> */}
          </div>

          <h6 className="title">Insert company * City, Province </h6>

          <div>
            <div className="form-control">
              <FaMapMarkerAlt /> City
            </div>
            <div className="form-control">
              <FaRegBuilding /> Remote
            </div>

            <div className="form-control">
              <FaBriefcase /> Full time
            </div>
            <div>
              <JobStatus isOpen={true} />
            </div>
            <div className="buttons-2">
              {/* <div href="" className="btn">
                Apply <FaExternalLinkAlt className="apply" size={15} />
              </div> */}
              <div href="" className="btn">
                More Info <FiInfo className="info" size={15} />
              </div>
              <div href="" className="btn-success">
                Applied <FaCheck className="info" size={15} />
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
