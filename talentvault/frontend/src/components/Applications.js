import "../index.css";
import Wrapper from "../assets/styling/jobs";
import {
  FaBriefcase,
  FaRegBuilding,
  FaMapMarkerAlt,
  FaEnvelopeOpenText,
  FaMailBulk
} from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";

const Applications = ({ application }) => {
    function JobStatus({ applicationStatus }) {
        return (
            <div className={`application-status ${applicationStatus == "Accepted" ?  "Accepted" 
            : applicationStatus == "Closed" ? "Closed" : "Pending"}`}> 

            {`application-status ${applicationStatus == "Accepted" ?  "You've been accepted for an interview" 
            : applicationStatus == "Unfortunately the company chose another company" ? "Closed" : 
            "Candidates are still being reviewed. Offers pending"}`}
            </div>
            ); //if accepted, else if closed, else pending
    }
    return (
        <>
          <Wrapper>
            <div className="form">
              <div className="top">
                <h4 className="form-title">{application.jobTitle}</h4>
                {/* <FaRegEdit className="edit" size={20} />
                <AiOutlineDelete className="delete" size={20} /> */}
              </div>
    
              <h6 className="title">{application.companyName} </h6>
    
              <div>
                <div className="form-control">
                  <FaMailBulk /> {application.JobStatus}
                </div>
                <div className="form-control">
                  <FaEnvelopeOpenText /> {application.applicationStatus}
                </div>
                
                <div>
                  {/* <JobStatus applicationStatus={applicationStatus === "Accepted" ?  "Accepted" 
                : applicationStatus === "Closed" ? "Closed" : "Pending"} /> */}
                </div>
                <div className="buttons-2">
                  {/* <div href="" className="btn">
                    Apply <FaExternalLinkAlt className="apply" size={15} />
                  </div> */}
                  <div>
                    {/* More Info <FiInfo className="info" size={15} /> */}

                    {/* <Link className="btn" to={`/job/${job._id}`}>More Info <FiInfo className="info" size={15} /></Link> */}
                  </div>
    
                </div>
              </div>
              <div className="form-group"></div>
            </div>
          </Wrapper>
        </>
      );
};
    export default Applications;
