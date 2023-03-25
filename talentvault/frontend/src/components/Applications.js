import "../index.css";
import Wrapper from "../assets/styling/jobs";
import {
  FaPhone,
  FaEnvelope,
  FaDownload,
  FaUser,
} from "react-icons/fa";
import { FiInfo } from "react-icons/fi";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectRole } from "../redux/features/auth/authSlice";
import { useState } from "react";
import { editApplicationStatus } from "../redux/features/application/applicationSlice";



const Applications = ({ application }) => {

  const dispatch = useDispatch()
  const [selectedStatus, setSelectedOption] = useState(application?.applicationStatus);


  const handleSelection = (event) => {
    const status = event.target.value;
    setSelectedOption(status);
  };



  const handleEditClick = async (ev) => {
    ev.preventDefault()

    const formData = {
      status: selectedStatus
    }
    await dispatch(editApplicationStatus({ id: application?.applicationId, formData }))
    window.location.reload()


  }

  let btnColor = "btn-pending";
  switch (application?.applicationStatus) {
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

  function ApplicationStatus({ btnColor }) {
    return (
      <div className={`job-status ${btnColor}`}>
        {application?.applicationStatus}
      </div>
    );
  }


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


              <div style={{ marginTop: "10px" }}>
                <ApplicationStatus btnColor={btnColor} />
              </div>
              <div className="buttons-2">
                <div>
                  {application?.resume ? <Link
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
                  </Link> : <> </>}

                </div>
              </div>

              {application?.isModified ? <></> : <><div>
                <label htmlFor="applicant-style" className="applicant-style"> Accept or Reject Applicant :</label>
              </div>
              <div className="dropdown"  style={{ display:"inline",margin: "auto",}}>
                <div style={{float:"left"}} >
                  <select className="dropdown-select" id="status-dropdown" defaultValue={application?.status} value={selectedStatus} onChange={handleSelection}>
                    <option value="Accepted">ACCEPT</option>
                    <option value="Rejected">REJECT</option>
                  </select>
                  </div>

                  <div style={{float:"left", paddingLeft:"25px"}}>
                    <button onClick={handleEditClick} className="confirm-btn">Confirm</button>
                  </div>
                </div>
                </>}
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



              <div style={{ marginTop: "10px" }} >
                <ApplicationStatus btnColor={btnColor} />
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
