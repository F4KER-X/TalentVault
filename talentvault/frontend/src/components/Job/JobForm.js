import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { selectCompany, selectID } from "../../redux/features/auth/authSlice";
import Card from "../Card/Card";
import "./JobForm.css";
import FormRow from "../FormRow";
import Wrapper from "../../assets/styling/CreateJob";

const JobForm = ({
  job,
  jobDescription,
  setJobDescription,
  handleInputChange,
  saveJob,
  error,
  salaryError,
}) => {
  const id = useSelector(selectID);
  const company = useSelector(selectCompany);

  return (
    <Wrapper>
      <div className="form">
        <Card cardClass={"card"}>
          <form onSubmit={saveJob}>
            <h5>Your Information</h5>
            <div className="unchangeable-values">
              <div className="floater">
                <label>Recruiter ID:</label>
                <input
                  type="text"
                  name="userId"
                  className="unchangeable-values-input"
                  value={id}
                  disabled
                />
              </div>
              <div className="floater">
                <label>Company Name:</label>
                <input
                  type="text"
                  name="companyName"
                  className="unchangeable-values-input"
                  value={company}
                  disabled
                />
              </div>
            </div>

            <div className="job-details">
              <h5>Job Information</h5>
              <FormRow
                type="text"
                labelText="Job Title"
                placeholder="Job Title"
                name="jobTitle"
                value={job?.jobTitle}
                onChange={handleInputChange}
                err={error}
              />
              <br />

              <div className={`salary-div`}>
                <div className="floater">
                  <label>Max Salary:</label>
                  <input
                    className={
                      error && !job?.maxSalary
                        ? "error"
                        : "" || salaryError
                          ? "error"
                          : ""
                    }
                    type="number"
                    placeholder="Max Salary"
                    min={0}
                    name="maxSalary"
                    value={job?.maxSalary}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="floater">
                  <label>Min Salary:</label>
                  <input
                    className={
                      error && !job?.minSalary
                        ? "error"
                        : "" || salaryError
                          ? "error"
                          : ""
                    }
                    type="number"
                    placeholder="Min Salary"
                    min={0}
                    name="minSalary"
                    value={job?.minSalary}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="Employment-Type">
                <div className="floater">
                  <label>Employment Type:</label>
                  <select
                    name="jobType"
                    className="employment-type-select"
                    value={job?.jobType}
                    onChange={handleInputChange}
                    aria-required="true"
                  >
                    <option className="dropdown_options" value="Full-time">
                      {" "}
                      Full-time
                    </option>
                    <option className="dropdown_options" value="Part-time">
                      Part-time
                    </option>
                    <option className="dropdown_options" value="Contractor">
                      {" "}
                      Contractor
                    </option>
                    <option className="dropdown_options" value="Temporary">
                      Temporary
                    </option>
                    <option className="dropdown_options" value="Other">
                      {" "}
                      Other
                    </option>
                  </select>
                </div>
              </div>

              <div className="floater">
                <label className="remotelabel">Remote:</label>
                <select
                  name="workType"
                  className="remote-type-select"
                  value={job?.workType || "Remote"}
                  onChange={handleInputChange}
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

              <br />
              <div className="jobRequirements">
                <label> Job Requirements</label>
                <input
                  //className="jobreqinput"
                  className={`jobreqinput ${error && !job?.jobRequirements ? "error" : ""
                    }`}
                  type="text"
                  placeholder="Ex: Organized, Independent, Team-Player, HTML, CSS, JavaScript"
                  name="jobRequirements"
                  value={job?.jobRequirements}
                  onChange={handleInputChange}
                />
                <br />
              </div>
              <br />

              <div className="location-div">
                <div className="floater">
                  <label>City:</label>
                  <input
                    className={` ${error && !job?.city ? "error" : ""}`}
                    type="text"
                    placeholder="City"
                    name="city"
                    value={job?.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="floater">
                  <label>Province:</label>
                  <input
                    className={` ${error && !job?.province ? "error" : ""}`}
                    type="text"
                    placeholder="Province"
                    name="province"
                    value={job?.province}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <br />

              <div className="jobdescriptiondiv">
                <label>Job Description</label>
                <ReactQuill
                  theme="snow"
                  value={jobDescription}
                  onChange={setJobDescription}
                  modules={JobForm.modules}
                  formats={JobForm.formats}
                  className={`jobdescriptionbox ${error && !jobDescription ? "error" : ""
                    }`}
                />
              </div>
              <div className="btndiv">
                <button type="submit" className="btn">
                  Save Job
                </button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </Wrapper>
  );
};

JobForm.modules = {
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
JobForm.formats = [
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

export default JobForm;
