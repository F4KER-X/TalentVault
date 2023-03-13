import React, { useState, useEffect } from "react";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { redirect, useNavigate, useParams } from "react-router-dom";
import Wrapper from "../assets/styling/JobsExtended";

import Loader from "./Loader";
import DOMPurify from "dompurify";
import JobDescription from "./DescriptionField";
import {
  FaBriefcase,
  FaBuilding,
  FaRegBuilding,
  FaExternalLinkAlt,
  FaRegEdit,
  FaCheck,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { deleteJob, getOneJob, editJob } from "../redux/features/job/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import UserRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";
import { selectRole, selectID } from "../redux/features/auth/authSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { FiInfo } from "react-icons/fi";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import DeleteModal from "./DeleteModal";
import Card from "./Card/Card";
import { toast } from "react-toastify";
const JobsExtended = () => {
  const role = useSelector(selectRole);
  const { id } = useParams();
  const user_id = useSelector(selectID);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //setting up states
  const [isLoading, setIsLoading] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [maxSalary, setMaxSalary] = useState(0);
  const [minSalary, setMinSalary] = useState(0);
  const [jobDescription, setJobDescription] = useState("");
  const [jobType, setJobType] = useState("");
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
  const handleJobRequirements = (ev) => {
    setJobRequirements(ev.target.value);
  };
  const handleJobType = (ev) => {
    setJobType(ev.target.value);
  };
  const handleJobLocation = (ev) => {
    const { name, value } = ev.target;
    setJobLocation((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleStatusClick = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    setStatus(newIsOpen ? "Open" : "Closed");
  };

  function handleEditClick(ev) {
    ev.preventDefault();
    setIsEditMode((prevState) => !prevState);
  }
  const handleSubmitClick = async (ev) => {
    ev.preventDefault();
    setIsLoading(true);
    const formData = {
      jobTitle,
      companyName,
      isOpen,
      maxSalary,
      minSalary,
      jobDescription,
      jobType,
      jobRequirements,
      jobLocation,
      status,
      workType,
    };
    await dispatch(editJob(formData, id));

    setIsEditMode(false);
    setIsLoading(false);
  };
  const handleCancelClick = () => {
    window.location.reload();
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
      user_id === id ? setIsOwner(true) : setIsOwner(false);
      setWorkType(job.workType);
      setIsLoading(false);
    }
  }, [job, id, user_id]);
  const requirements = jobRequirements;
  const requirementList = requirements.split(","); // split on commas and spaces

  function JobStatus({ isOpen, onClick }) {
    return (
      <div
        onClick={onClick}
        className={`job-status ${isOpen ? "open" : "closed"}`}
      >
        {isOpen ? "Open" : "Closed"}
      </div>
    );
  }

  //delete job
  const delJob = async (id) => {
    const promise = await dispatch(deleteJob(id));
    if (promise.meta.requestStatus === "fulfilled") navigate("/dashboard");
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Job",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delJob(id),
        },
        {
          label: "Cancel",
          //onClick: () => delJob(id)
        },
      ],
    });
  };
  return (
    <>
      {isLoading && <Loader />}

      {/* below is the normal form */}

      <Wrapper>
        <div className="form">
          <div className="buttons-2">
            {" "}
            {isEditMode && (
              <button className="btn" onClick={() => handleSubmitClick()}>
                <AiOutlineDelete className="delete" size={20} />
                Submit
              </button>
            )}
            {!isEditMode && (
              <button className="btn" onClick={handleEditClick}>
                <FaRegEdit className="edit" size={20} />
                {isEditMode ? "Save" : "Edit"}
              </button>
            )}
            {isEditMode && (
              <button className="btn" onClick={handleCancelClick}>
                <AiOutlineDelete className="delete" size={20} />
                Cancel
              </button>
            )}
            <button className="btn" onClick={() => confirmDelete(id)}>
              <AiOutlineDelete className="delete" size={20} />
              Delete
            </button>
          </div>
          <div className="top">
            {isEditMode ? (
              <input
                type="text"
                className={
                  "form-title  form-input" +
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
          </div>

          <h5 className="title form-control">{companyName}</h5>

          {/* <h5 className="title address form-control">
            <FaMapMarkerAlt />
            {jobLocation.city}, {jobLocation.province}
          </h5> */}
          {isEditMode ? (
            <div className="location-div">
              <div className="title form-control ">
                <FaMapMarkerAlt size={25} className="address" />
                <input
                  type="text"
                  className="address form-input "
                  name="city"
                  value={jobLocation.city}
                  onChange={handleJobLocation}
                />

                <input
                  type="text"
                  className="address form-input"
                  name="province"
                  value={jobLocation.province}
                  onChange={handleJobLocation}
                />
              </div>
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
                value={workType}
                onChange={handleWorkType}
                aria-required="true"
              >
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
            {isEditMode ? (
              <div className="Employment-Type">
                <div className="floater">
                  <FaBriefcase />
                  <label>Employment Type:</label>
                  <select
                    name="jobType"
                    className="employment-type-select"
                    value={jobType}
                    onChange={handleJobType}
                    aria-required="true"
                  >
                    <option className="dropdown_options" value="Full-time">
                      Full-Time
                    </option>
                    <option className="dropdown_options" value="Part-time">
                      Part-Time
                    </option>
                    <option className="dropdown_options" value="Contractor">
                      Contractor
                    </option>
                    <option className="dropdown_options" value="Temporary">
                      Temporary
                    </option>
                    <option className="dropdown_options" value="Other">
                      Other
                    </option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="form-control">
                <FaBriefcase /> {jobType}
              </div>
            )}

            {isEditMode ? (
              <>
                <div className="Couple">
                  Click To Change The Status
                  <JobStatus isOpen={isOpen} onClick={handleStatusClick} />
                </div>
              </>
            ) : (
              <div>
                <JobStatus isOpen={isOpen} />
              </div>
            )}

            {role === "Applicant" && (
              <div className="buttons-2">
                <div href="" className="btn">
                  Apply <FaExternalLinkAlt className="apply" size={15} />
                </div>

                <div href="" className="btn-success">
                  Applied <FaCheck className="info" size={15} />
                </div>
              </div>
            )}
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

              {isEditMode ? (
                <div className={`salary-div`}>
                  <div className="floater">
                    <label>Max Salary:</label>
                    <input
                      type="number"
                      placeholder="Max Salary"
                      name="maxSalary"
                      value={maxSalary}
                      onChange={handleMaxSalary}
                    />
                  </div>
                  <div className="floater">
                    <label>Min Salary:</label>
                    <input
                      type="number"
                      placeholder="Min Salary"
                      name="minSalary"
                      value={minSalary}
                      onChange={handleMinSalary}
                    />
                  </div>
                </div>
              ) : (
                <div className="couple">
                  <h5>Salary</h5>
                  <p>
                    Between $<span>{minSalary}</span> and $
                    <span>{maxSalary}</span>
                  </p>
                </div>
              )}

              {isEditMode ? (
                <div className="jobRequirements">
                  <label> Job Requirements</label>
                  <br />
                  <input
                    className="jobreqinput"
                    type="text"
                    placeholder="Ex: Organized, Independent, Team-Player, HTML, CSS, JavaScript"
                    name="jobRequirements"
                    value={jobRequirements}
                    onChange={handleJobRequirements}
                  />
                </div>
              ) : (
                <div className="couple">
                  <h5>Requirements</h5>

                  <ul>
                    {requirementList.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </div>
              )}

              {isEditMode ? (
                <JobDescription
                  jobDescription={jobDescription}
                  setJobDescription={setJobDescription}
                />
              ) : (
                <div className="couple">
                  <h5>Description</h5>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(jobDescription),
                    }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default JobsExtended;
