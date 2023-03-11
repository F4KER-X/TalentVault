import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux";
import { selectCompany, selectID } from "../../redux/features/auth/authSlice";
import Card from "../Card/Card";
import "./JobForm.css";
import FormRow from "../FormRow";
import Wrapper from "../../assets/styling/JobsExtended";



const JobForm = ({ job, jobDescription, setJobDescription, handleInputChange, saveJob, onChange }) => {

    const id = useSelector(selectID)
    const company = useSelector(selectCompany)

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
                    />
                    <br />

                    <div className="salary-div">
                        <div className="floater">
                            <label>Max Salary:</label>
                            <input
                             type="number"
                             placeholder="Max Salary"
                             name="maxSalary"
                             value={job?.maxSalary}
                             onChange={handleInputChange}
                            />
                        </div>
                         <div className="floater">
                             <label>Min Salary:</label>
                             <input
                                type="number"
                                placeholder="Min Salary"
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
                                <option className="dropdown_options" value="full_time"> Full-Time </option>
                                <option className="dropdown_options" value="part_time">Part-Time</option>
                                <option className="dropdown_options" value="contractor"> Contractor</option>
                                <option className="dropdown_options" value="temporary">Temporary</option>
                                <option className="dropdown_options" value="other"> Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="floater">
                        <label className="remotelabel">Remote:</label>
                        <select
                          name="workType"
                          className="remote-type-select"
                          value={job?.workType}
                          onChange={handleInputChange}
                          aria-required="true"
                        >
                            <option className="dropdown_options" value="Remote">Remote</option>
                            <option className="dropdown_options" value="Hybrid"> Hybrid</option>
                            <option className="dropdown_options" value="Onsite"> On-site</option>
                        </select>
                    </div>

                     <br /> 
                    <div className="jobRequirements">
                        <label> Job Requirements</label>
                        <input
                         className="jobreqinput"
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
                              className="jobdescriptionbox"
                            />

                        </div>
                         <div className="btndiv">
                            <button  type="submit" className="btn">Save Job</button>
                        </div>

                 </div>
                </form>
            </Card>
        </div>        
     </Wrapper>
    );

}

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


export default JobForm