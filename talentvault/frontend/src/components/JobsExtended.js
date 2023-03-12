import React, { useState, useEffect } from "react";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { useParams } from "react-router-dom";
import Wrapper from "../assets/styling/JobsExtended";
import InputField from "./InputField";
import Loader from "./Loader";
import {
  FaBriefcase,
  FaBuilding,
  FaRegBuilding,
  FaExternalLinkAlt,
  FaRegEdit,
  FaCheck,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { getOneJob } from "../redux/features/job/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import UserRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";
import { selectRole } from "../redux/features/auth/authSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { FiInfo } from "react-icons/fi";
const JobsExtended = () => {
  const role = useSelector(selectRole);
  const { id } = useParams();

  const dispatch = useDispatch();
  //setting up states
  const [isLoading, setIsLoading] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [maxSalary, setMaxSalary] = useState(null);
  const [minSalary, setMinSalary] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [jobType, setJobType] = useState(null);
  const [jobRequirements, setJobRequirements] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [status, setStatus] = useState("");
  const [workType, setWorkType] = useState("");

  const isLoggedIn = useSelector(selectIsLoggedIn);

  //Handle change
  const handleJobTitle = (ev) => {
    setJobTitle(ev.target.value);
  };
  const handleCompanyName = (ev) => {
    setCompanyName(ev.target.value);
  };
  const handleMaxSalary = (ev) => {
    setMaxSalary(ev.target.value);
  };
  const handleMinSalary = (ev) => {
    setMinSalary(ev.target.value);
  };
  const handleJobDescription = (ev) => {
    setJobDescription(ev.target.value);
  };
  const handleWorkType = (ev) => {
    setWorkType(ev.target.value);
  };
  const handleJobType = (ev) => {
    setJobType(ev.target.value);
  };
  const handleJobLocation = (ev) => {
    setJobLocation(ev.target.value);
  };

  const { job, isError, message } = useSelector(
    (state) => state.job,
    (prev, next) => prev.job === next.job
  );

  useEffect(() => {
    setIsLoading(true);
    if (isLoggedIn) {
      dispatch(getOneJob(id));
    }
    if (isError) {
      console.log(message);
    }
  }, [dispatch, isError, isLoggedIn, message, id]);
  console.log(job);

  // Access specific fields of the job object
  useEffect(() => {
    if (job) {
      setJobTitle(job.jobTitle);
      setCompanyName(job.companyName);
      setMaxSalary(job.maxSalary);
      setMinSalary(job.minSalary);
      setJobDescription(job.jobDescription);
      setJobType(job.jobType);
      setJobRequirements(job.jobRequirements);
      setJobLocation(job.jobLocation);
      setStatus(job.status);
      job.status === "Open" ? setIsOpen(true) : setIsOpen(false);
      setWorkType(job.workType);
      setIsLoading(false);
    }
  }, [job]);
  const requirements = jobRequirements;
  const requirementList = requirements.split(","); // split on commas and spaces

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

  return (
    <>
      {isLoading && <Loader />}

      {/* below is the normal form */}

      <Wrapper>
        <div className="form">
          <div className="top">
            {isEditMode ? (
              <input
                type="text"
                className={
                  "form-title form-control" +
                  (jobTitle === "" ? " is-invalid" : "")
                }
                name="jobTitle"
                value={jobTitle}
                onChange={handleJobTitle}
              />
            ) : (
              <h4 className="form-title">{jobTitle}</h4>
            )}

            {/* <h4 className="form-title">{jobTitle}</h4> */}
            <div className="buttons-2">
              {" "}
              <button className="btn" onClick={handleEditClick}>
                <FaRegEdit className="edit" size={20} /> Edit{" "}
              </button>
              <button className="btn">
                <AiOutlineDelete className="delete" size={20} /> Delete{" "}
              </button>
            </div>
          </div>

          {/* <h5 className="title form-control">{companyName} </h5> */}
          {isEditMode ? (
            <input
              type="text"
              className={
                "title form-control" + (companyName === "" ? " is-invalid" : "")
              }
              name="companyName"
              value={companyName}
              onChange={handleCompanyName}
            />
          ) : (
            <h5 className="title form-control">{companyName}</h5>
          )}

          {/* <h5 className="title address form-control">
            <FaMapMarkerAlt />
            {jobLocation.city}, {jobLocation.province}
          </h5> */}
          {isEditMode ? (
            <div className="title form-control">
              <FaMapMarkerAlt />
              <input
                type="text"
                className="address"
                name="city"
                value={jobLocation.city}
                onChange={handleJobLocation}
              />
              ,
              <input
                type="text"
                className="address"
                name="province"
                value={jobLocation.province}
                onChange={handleJobLocation}
              />
            </div>
          ) : (
            <h5 className="title address form-control">
              <FaMapMarkerAlt />
              {jobLocation.city}, {jobLocation.province}
            </h5>
          )}

          {isEditMode ? (
            <div className="floater">
              <FaRegBuilding />
              <label className="remotelabel">Work Type:</label>
              <select
                name="workType"
                className="remote-type-select"
                value={job?.workType}
                onChange={handleWorkType}
                aria-required="true"
              >
                <option className="dropdown_options" value="Remote"></option>
                <option className="dropdown_options" value="Remote">
                  Remote
                </option>
                <option className="dropdown_options" value="Hybrid">
                  {" "}
                  Hybrid
                </option>
                <option className="dropdown_options" value="Onsite">
                  {" "}
                  On-site
                </option>
              </select>
            </div>
          ) : (
            <div className="form-control">
              <FaRegBuilding /> {workType}
            </div>
          )}

          <div>
            <div className="form-control">
              <FaBriefcase /> {jobType}
            </div>
            <div>
              <JobStatus isOpen={isOpen} />
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
                <p>{jobType}</p>
              </div>

              <div className="couple">
                <h5>postion</h5>
                <p>software engineer</p>
              </div>
              <div className="couple">
                <h5>Salary</h5>
                <p>
                  Between $<span>{minSalary}</span> and $
                  <span>{maxSalary}</span>
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
                <p>{jobDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
export default JobsExtended;

{
  /* To be implemented, the edit form
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
      </Wrapper> */
}
