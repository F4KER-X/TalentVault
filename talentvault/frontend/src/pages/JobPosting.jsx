import React, { useState } from "react";
import "../index.css";
import Wrapper from "../assets/styling/RegisterPage";
import FormRow from "../components/FormRow";

function JobPosting() {
  const [formData, setFormData] = useState({
    jobtitle: "",
    remotejob: "",
    employmenttype: "",
    jobloc: "",
  });

  const { jobtitle, remotejob, employmenttype, jobloc } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={{ onSubmit }}>
        <h3 className="form-title">Your Job Posting</h3>

       
          <FormRow
            type="text"
            labelText="Job Title"
            className="form-control"
            placeholder="Enter job title"
            name="jobtitle"
            value={jobtitle}
            onChange={onChange}
          />

          <FormRow
            type="text"
            labelText="Job Location"
            className="form-control"
            placeholder="Enter job title"
            name="jobloc"
            value={jobloc}
            onChange={onChange}
          />
    

        <div className="form-group" id="remotejobcheckbox">
          <label id="checkboxlabel">
            This role can be performed remotely
          </label>
          <input
            type="checkbox"
            className="form-control-checkbox"
            name="remotejob"
            value={remotejob}
            onChange={onChange}
            unchecked
          />
        </div>

        <div className="form-group" id="custom-select">
          <label>Employment Type</label>
          <select
            name="employment_type"
            className="form-control"
            value={employmenttype}
            onChange={onChange}
            aria-required="true"
          >
            <option className="dropdown_options" value="full_time">
              Full-Time
            </option>
            <option className="dropdown_options" value="part_time">
              Part-Time
            </option>
            <option className="dropdown_options" value="contractor">
              Contractor
            </option>
            <option className="dropdown_options" value="temporary">
              Temporary
            </option>
            <option className="dropdown_options" value="other">
              Other
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>Job Description</label>
          <textarea
            type="textarea"
            className="form-control-text-area"
            name="jobdescription"
            placeholder="Please paste your job description here"
          />
        </div>

  
          <button type="submit" className="btn btn-block">
            Save and Continue
          </button>
       
      </form>
    </Wrapper>
  );
}

export default JobPosting;
