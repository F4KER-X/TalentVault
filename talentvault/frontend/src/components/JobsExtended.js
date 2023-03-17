import React, { useState, useEffect } from "react";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import Wrapper from "../assets/styling/JobsExtended";
import ReactQuill from "react-quill";
import Loader from "./Loader";
import DOMPurify from 'dompurify'
import {
  FaBriefcase,
  FaRegBuilding,
  FaExternalLinkAlt,
  FaRegEdit,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { deleteJob, getOneJob, editJob } from "../redux/features/job/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectRole, selectID } from "../redux/features/auth/authSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

const JobsExtended = () => {
  const role = useSelector(selectRole);
  const { id } = useParams();
  const userId = useSelector(selectID)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  //states
  const [isLoading, setIsLoading] = useState(false)
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [maxSalary, setMaxSalary] = useState(0);
  const [minSalary, setMinSalary] = useState(0);
  const [jobDescription, setJobDescription] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");
  const [status, setStatus] = useState("");
  const [workType, setWorkType] = useState("");
  const [editMode, setEditMode] = useState(false)
  const [isOwner, setIsOwner] = useState(false)



  const { job, isError, message } = useSelector((state) => state.job)

  //fetching job data
  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true)
      dispatch(getOneJob(id))
    }

    if (isError) {
      toast.error(message)
    }

    setIsLoading(false)

  }, [dispatch, id, isLoggedIn, isError, message, setIsOwner])

  //setting all states
  useEffect(() => {
    if (job?.recruiterId === userId) setIsOwner(true)
    setJobTitle(job?.jobTitle)
    setCompanyName(job?.companyName)
    setMaxSalary(job?.maxSalary)
    setMinSalary(job?.minSalary)
    setJobDescription(job?.jobDescription)
    setJobType(job?.jobType)
    setJobLocation(job?.jobLocation)
    setJobRequirements(job?.jobRequirements)
    setStatus(job?.status)
    setWorkType(job?.workType)
  }, [job?.recruiterId, job?.jobTitle, job?.companyName, job?.maxSalary, job?.minSalary, job?.jobDescription, job?.jobType, job?.jobLocation, job?.jobRequirements, job?.status, job?.workType, userId],)



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

  //edit button
  const handleEditJobButton = (ev) => {
    ev.preventDefault();
    setEditMode((prevState) => !prevState);
  }

  const handleCancelClick = () => {
    setEditMode(false)
    window.location.reload();
  }

  const handleSaveClick = async (ev) => {
    ev.preventDefault()

    const formData = {
      jobTitle,
      maxSalary,
      minSalary,
      jobDescription,
      jobType,
      jobRequirements,
      jobLocation: {
        city: jobLocation.city,
        province: jobLocation.province,
      },
      workType,
      status
    };

    if (
      !formData.jobTitle ||
      !formData.maxSalary ||
      !formData.minSalary ||
      !formData.jobDescription ||
      !formData.jobLocation.city ||
      !formData.jobLocation.province ||
      !formData.workType ||
      !formData.jobRequirements
    ) {
      return toast.error("All fields are required");
    }

    if (formData.maxSalary < 0 || formData.minSalary < 0) {
      return toast.error("Negative salaries are not allowed");
    }

    if (formData.maxSalary <= formData.minSalary) {
      return toast.error("Max salary can not be less or equals to Min salary");
    }
    setIsLoading(true)
    dispatch(editJob({ id, formData }))
    setIsLoading(false)
    setEditMode(false)
  }

  const handleJobTitle = (ev) => {
    setJobTitle(ev.target.value);
  };
  const handleMaxSalary = (ev) => {
    setMaxSalary(ev.target.value);
  };
  const handleMinSalary = (ev) => {
    setMinSalary(ev.target.value);
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
    setStatus(status === 'Open' ? "Closed" : "Open");
  };

  const requirements = jobRequirements;
  const requirementList = requirements?.split(",");

  //delete job
  const handleDelJob = async (id) => {
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
          onClick: () => handleDelJob(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };
  return (
    <>
      {isLoading && <Loader />}

      {/* below is the normal form */}

      <Navbar />
      <Wrapper>
        <div className="form">
          {isOwner &&
            <div className="buttons-2">
              {editMode ? <><button className="btn" onClick={handleSaveClick}>
                <FaRegEdit className="edit" size={20} />Save
              </button>
                <button className="btn" onClick={handleCancelClick}>
                  <AiOutlineDelete className="delete" size={20} /> Cancel
                </button></> :
                <><button className="btn" onClick={handleEditJobButton}>
                  <FaRegEdit className="edit" size={20} />Edit Job
                </button>
                  <button className="btn" onClick={() => confirmDelete(id)}>
                    <AiOutlineDelete className="delete" size={20} /> Delete
                  </button></>
              }
            </div>
          }
          <div className="top">
            {editMode ? (
              <>
                <input
                  type="text"
                  className={

                    "form-title form-input" +
                    (jobTitle === "" ? " is-invalid" : "")
                  }
                  name="jobTitle"
                  value={jobTitle}
                  onChange={handleJobTitle}
                /></>
            ) :
              <h4 className="form-title">{jobTitle}</h4>}
          </div>

          <h5 className="title form-control">{companyName}</h5>
          {editMode ? (
            <div className="title form-control">
              <FaMapMarkerAlt />
              <input
                type="text"
                className={"address form-input-location" + (jobLocation?.city === "" ? " is-invalid" : "")}
                name="city"
                value={jobLocation?.city}
                onChange={handleJobLocation}
              />
              ,
              <input
                type="text"
                className={"address form-input-location" + (!jobLocation?.province ? " is-invalid" : "")}
                name="province"
                value={jobLocation?.province}
                onChange={handleJobLocation}
              />
            </div>
          ) : (
            <h5 className="title address form-control">
              <FaMapMarkerAlt className="locationIcon" />
              {jobLocation?.city}, {jobLocation?.province}
            </h5>)}

          {editMode ? (
            <div className="workTypediv">
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
                  Hybrid
                </option>
                <option className="dropdown_options" value="Onsite">
                  On-site
                </option>
              </select>
            </div>
          ) :
            <div className="form-control">
              <FaRegBuilding /> {workType}
            </div>
          }

          <div>
            {editMode ? (
              <div className="jobTypediv">
                <FaBriefcase />
                <label className="remotelabel">Employment Type:</label>
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
            ) :
              <div className="form-control">
                <FaBriefcase /> {jobType}
              </div>
            }

            {editMode ? (
              <>
                <div className="Couple">
                  <div className="statusDiv">
                    <span className="statusSpan">Click to change the status:</span>
                    <JobStatus isOpen={status === 'Open'} onClick={handleStatusClick} />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <JobStatus isOpen={status === 'Open'} />
              </div>)}

            {role === "applicant" && !editMode && (
              <div className="buttons-1">
                <button className="btn" style={{ marginLeft: "0", marginTop: "15px" }}>
                  Apply <FaExternalLinkAlt className="" size={15} />
                </button>

              </div>
            )}
          </div>

          <div className="description">
            <h4>Job Details</h4>

            <div className="container">
              {!editMode && <div className="couple">
                <h5>Job Type</h5>
                <p>{jobType}</p>
              </div>}


              <div className="couple">
                <h5>Salary</h5>
                {editMode ?
                  <div className='salary-d'>
                    <div className="floater">
                      <label>Max Salary:</label>
                      <input
                        className={!maxSalary && 'is-invalid'}
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
                        className={!minSalary && 'is-invalid'}
                        type="number"
                        placeholder="Min Salary"
                        name="minSalary"
                        value={minSalary}
                        onChange={handleMinSalary}

                      />
                    </div>
                  </div> : <p>Between: ${minSalary} and ${maxSalary}</p>}
              </div>

              {editMode ? <div className="jobRequirements couple">
                <h5>Requirements</h5>
                <br />
                <textarea
                  className={"jobreqinput" + (jobRequirements === '' ? ' is-invalid' : '')}
                  placeholder="Ex: Organized, Independent, Team-Player, HTML, CSS, JavaScript"
                  name="jobRequirements"
                  value={jobRequirements}
                  onChange={handleJobRequirements}
                ></textarea>
              </div> : <div className="couple">
                <h5>Requirements</h5>
                <ul>
                  {requirementList?.map((requirement, index) => (
                    <li key={index}>{requirement.trim()}</li>
                  ))}
                </ul>
              </div>}

            </div>
            <div className="couple">
              <h5>Description</h5>
              {editMode ? <div className="jobdescriptiondiv jobDescriptionPara">
                <ReactQuill
                  theme="snow"
                  value={jobDescription}
                  onChange={setJobDescription}
                  modules={JobsExtended.modules}
                  formats={JobsExtended.formats}
                  className={`jobdescriptionbox`}
                />
              </div> : <div className="jobDescriptionPara" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(jobDescription) }}></div>}

            </div>
          </div>
        </div>
      </Wrapper>
    </>

  );
};
JobsExtended.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
JobsExtended.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default JobsExtended;
