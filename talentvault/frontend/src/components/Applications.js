import "../index.css";
import Wrapper from "../assets/styling/jobs";
import {
  FaEnvelopeOpenText,
  FaPhone,
  FaEnvelope,
  FaDownload,
  FaUser,
} from "react-icons/fa";
import { FiInfo } from "react-icons/fi";

import { Link } from "react-router-dom";
import "./Applications.css";
import { useSelector } from "react-redux";
import { selectRole } from "../redux/features/auth/authSlice";

const Applications = ({ application }) => {
  function JobStatus({ isOpen }) {
    return (
      <div className={`job-status ${isOpen ? "open" : "closed"}`}>
        {isOpen ? "Open" : "Closed"}
      </div>
    );
  }

  let btnColor = "btn-pending";
  switch (application?.status) {
    case "Accepted":
      btnColor = "btn-accepted";
      break;

    case "Rejected":
      btnColor = "btn-rejected";
      break;

    default:
      btnColor = "btn-pending";
      break;
  }

  /*   function ApplicationStatus( applicationStatus ) {
     return (
        <div className={`application-status ${applicationStatus == "Accepted" ?  "Accepted" 
        : applicationStatus == "Closed" ? "Closed" : "Pending"}`}> 
        </div>
     );
   }
      */

  const role = useSelector(selectRole);

  return (
    <>
      {role === "recruiter" ? (
        <Wrapper>
          <div className="form">
            <div>
              <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
                <FaUser /> {application?.firstName} {application?.lastName}
              </div>
              {application?.phoneNumber ? (
                <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
                  {" "}
                  <FaPhone /> {application?.phoneNumber}
                </div>
              ) : (
                <></>
              )}
              <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
                {" "}
                <FaEnvelope /> {application?.email}
              </div>
              <div
                className={`form-control ${btnColor}`}
                style={{ marginBottom: "10px" }}
              >
                <FaEnvelopeOpenText /> {application?.applicationStatus}
              </div>
              <div></div>
              <div className="buttons-2">
                <div>
                  <Link
                    className="btn"
                    to={application?.resume}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0",
                      width: "150px",
                    }}
                  >
                    View CV <FaDownload className="info" size={15} />
                  </Link>
                </div>
              </div>

              <div>
                <ApplicationStatus btnColor={btnColor} />
              </div>
              <div className="buttons-2">
                <div>
                  <Link className="btn">
                    View CV <FaDownload className="info" size={15} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="form-group"></div>
          </div>
        </Wrapper>
      ) : (
        <Wrapper>
          <div className="form">
            <div className="top">
              <h4 className="form-title" style={{ marginLeft: "10px" }}>
                {application?.jobTitle}
              </h4>
            </div>

            <h6 className="title" style={{ marginLeft: "10px" }}>
              {application?.companyName}
            </h6>

            <div>
              <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
                <FaUser /> {application?.firstName} {application?.lastName}
              </div>
              <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
                {" "}
                <FaEnvelope /> {application?.email}
              </div>

              <JobStatus
                isOpen={application?.jobStatus === "Open" ? true : false}
              />

              <div
                className={`form-control ${btnColor}`}
                style={{ marginTop: "10px" }}
              >
                <FaEnvelopeOpenText /> {application?.applicationStatus}
              </div>

              <div>
                {/* <ApplicationStatus applicationStatus={applicationStatus === "Accepted" ?  "Accepted" 
                : applicationStatus === "Closed" ? "Closed" : "Pending"} />  */}
              </div>
              <div className="buttons-2">
                <div>
                  <div>
                    {/* More Info <FiInfo className="info" size={15} /> */}
                    <Link
                      className="btn"
                      to={`/job/${application?.jobId}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0",
                        width: "150px",
                      }}
                    >
                      More Info <FiInfo className="info" size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group"></div>
          </div>
        </Wrapper>
      )}
    </>
  );
};
export default Applications;
