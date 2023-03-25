import "../index.css";
import Wrapper from "../assets/styling/jobs";
import {
  FaEnvelopeOpenText,
  FaPhone,
  FaEnvelope,
  FaDownload,
  FaUser
} from "react-icons/fa";
import {  useSelector } from "react-redux";
import { selectRole } from "../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Applications = ({ application }) => {

  const role = useSelector(selectRole);


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

  /* function ApplicationStatus({ applicationStatus }) {
    return (
       <div className={`application-status ${applicationStatus == "Accepted" ?  "Accepted" 
       : applicationStatus == "Closed" ? "Closed" : "Pending"}`}> 
       </div>
    );
  }
    
 */

  return (
    
    <>
      <Wrapper>
        <div className="form">
          <div className="top">
            <h4 className="form-title">{application?.jobTitle}</h4> 
          </div>

          <h6 className="title">{application?.companyName}</h6>

          <div>
            <div><FaUser/> insert applicant full name here</div>
            <div> <FaPhone/> insert applicant phone number here</div>
            <div> <FaEnvelope/> insert applicant email address</div>


            
            <div className="form-control">
              <FaEnvelopeOpenText /> {application?.status}
            </div>

             <div>
              {/* <ApplicationStatus applicationStatus={applicationStatus === "Accepted" ?  "Accepted" 
                : applicationStatus === "Closed" ? "Closed" : "Pending"} />  */}
            </div> 
            <div className="buttons-2">
              <div>
                <Link className="btn">View CV <FaDownload className="info" size={15} /></Link>
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
