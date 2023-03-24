import "../index.css";
import Wrapper from "../assets/styling/jobs";
import {
  FaEnvelopeOpenText,
  FaMailBulk
} from "react-icons/fa";

import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";

const Applications = ({ application }) => {

  let btnColor = "btn-pending";
  switch (application?.status) {
    case "Accepted":
      btnColor = "btn-accepted";
      break;

    case "Rejected":
      btnColor = "btn-rejected";
      break;

    default:
      btnColor = "btn-pending"
      break;
  }
  // function ApplicationStatus({ applicationStatus }) {
  //     return (
  //         <div className={`application-status ${applicationStatus == "Accepted" ?  "Accepted" 
  //         : applicationStatus == "Closed" ? "Closed" : "Pending"}`}> 

  return (
    <>
      <Wrapper>
        <div className="form">
          <div className="top">
            <h4 className="form-title">{application?.jobTitle}</h4>
            {/* <FaRegEdit className="edit" size={20} />
                <AiOutlineDelete className="delete" size={20} /> */}
          </div>

          <h6 className="title">{application?.companyName} </h6>

          <div>
            <div className="form-control">
              <FaMailBulk /> {application?.jobStatus}
              {/* <ApplicationStatus applicationStatus={"Accepted"}/> */}
            </div>
            <div className="form-control">
              <FaEnvelopeOpenText /> {application?.status}
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
                <Link className={btnColor} to={`/job/${application?._id}`}>More Info <FiInfo className="info" size={15} /></Link>
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
