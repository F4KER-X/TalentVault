import { useState } from "react";
import Wrapper from "../assets/styling/JobsExtended";
import InputField from "./InputField";
import {
  FaBriefcase,
  FaBuilding,
  FaRegBuilding,
  FaExternalLinkAlt,
  FaRegEdit,
  FaCheck,
} from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FiInfo } from "react-icons/fi";
import { createNewApplication } from "../redux/features/application/createApplicationSlice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  selectID,
  selectIsLoggedIn,
  selectRole,
} from "../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const JobsExtended = (job) => {

  const dispatch = useDispatch();

  const location = useLocation();
  const {jobId} = location.state;

  const requirements =
    "Experience with React,Experience with Node.js,Experience with MongoDB";
  const requirementList = requirements.split(","); // split on commas and spaces
  console.log(jobId);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectID);
  const userRole = useSelector(selectRole);

  const { applications, isLoading, isError, message } = useSelector(
    (state) => state.application
  );

  useEffect(() => {
    if (isLoggedIn) {
      // dispatch(createNewApplication(jobId));

      console.log(applications);
    }
  }, [dispatch, isLoggedIn, userId]);

  function JobStatus({ isOpen }) {
    return (
      <div className={`job-status ${isOpen ? "open" : "closed"}`}>
        {isOpen ? "Open" : "Closed"}
      </div>
    );
  }
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick(e) {
    e.preventDefault();
    setIsEditing(true);
  }

  const apply = async () => {
    console.log("BEEN CALLED!!!!!!!");
    console.log(jobId);
    const applicationData = {
      _id:jobId
    };

    await dispatch(createNewApplication(jobId));
  }

  // async function apply() {
  //   await dispatch(createNewApplication({
  //     _id:jobId,
  //     role:"Applicant"
  //   }))
  // }
  

  return (
    <>
      {/* To be implemented, the edit form */}
      <Wrapper>
        <div className="form">
          <div className="top">
            <h4 className="form-title">Insert Job Title Here</h4>
            <FaRegEdit className="edit" size={20} onClick={handleEditClick} />
            <AiOutlineDelete className="delete" size={20} />
          </div>

          <h6 className="title">Insert company * City, Province </h6>
          <h6 className="title address">Insert City, Province</h6>
          <div>
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
              <button onClick={apply}></button>

              <div href="" className="btn-success">
                Applied <FaCheck className="info" size={15} />
              </div>
            </div>
          </div>
          <div className="description">
            <h4>Job Details</h4>

            <div className="`container">
              <div className="couple">
                <h5>Job Type</h5>
                <InputField />
              </div>

              <div className="couple">
                <h5>postion</h5>
                <p>software engineer</p>
              </div>
              <div className="couple">
                <h5>Salary</h5>
                <p>
                  Between $<span>25000</span> and $<span>30000</span>
                </p>
              </div>
              <div className="couple">
                <h5>Requirements</h5>

                <ul>
                  {requirementList.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>
              <div className="couple">
                <h5>Description</h5>
                <p>
                  We are seeking a skilled React developer to join our team. You
                  will be responsible for developing and maintaining web
                  applications using React, Redux, and related technologies. The
                  ideal candidate will have experience with responsive design,
                  cross-browser compatibility, and testing frameworks such as
                  Jest or Enzyme.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>

      {/* below is the normal form */}

      <Wrapper>
        <div className="form">
          <div className="top">
            <h4 className="form-title">Insert Job Title Here</h4>
            <FaRegEdit className="edit" size={20} onClick={handleEditClick} />
            <AiOutlineDelete className="delete" size={20} />
          </div>

          <h6 className="title">Insert company * City, Province </h6>
          <h6 className="title address">Insert City, Province</h6>
          <div>
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
              <div href="" className="btn">
                Apply <FaExternalLinkAlt className="apply" size={15} />
              </div>

              <div href="" className="btn-success">
                Applied <FaCheck className="info" size={15} />
              </div>
            </div>
          </div>
          <div className="description">
            <h4>Job Details</h4>

            <div className="`container">
              <div className="couple">
                <h5>Job Type</h5>
                <p>Part-time</p>
              </div>

              <div className="couple">
                <h5>postion</h5>
                <p>software engineer</p>
              </div>
              <div className="couple">
                <h5>Salary</h5>
                <p>
                  Between $<span>25000</span> and $<span>30000</span>
                </p>
              </div>
              <div className="couple">
                <h5>Requirements</h5>

                <ul>
                  {requirementList.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>
              <div className="couple">
                <h5>Description</h5>
                <p>
                  We are seeking a skilled React developer to join our team. You
                  will be responsible for developing and maintaining web
                  applications using React, Redux, and related technologies. The
                  ideal candidate will have experience with responsive design,
                  cross-browser compatibility, and testing frameworks such as
                  Jest or Enzyme.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
export default JobsExtended;
