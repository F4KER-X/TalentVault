import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux";
import { selectCompany, selectID } from "../../redux/features/auth/authSlice";
import Card from "../Card/Card";



const JobForm = ({ job, jobDescription, setJobDescription, handleInputChange, saveJob }) => {

    const id = useSelector(selectID)
    const company = useSelector(selectCompany)

    return (
        <div className="add-product">
            <Card cardClass={"card"}>
                <form onSubmit={saveJob}>

                    <label>Recruiter ID:</label>
                    <input
                        type="text"
                        name="userId"
                        value={id}
                        disabled
                    />
                    <br />
                    <label>Job Title:</label>
                    <input
                        type="text"
                        placeholder="Job Title"
                        name="jobTitle"
                        value={job?.jobTitle}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label>Company Name:</label>
                    <input
                        type="text"
                        name="companyName"
                        value={company}
                        disabled

                    />
                    <br />
                    <label>Max Salary:</label>
                    <input
                        type="number"
                        placeholder="Max Salary"
                        name="maxSalary"
                        value={job?.maxSalary}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label>Min Salary:</label>
                    <input
                        type="number"
                        placeholder="Min Salary"
                        name="minSalary"
                        value={job?.minSalary}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label>Job type:</label>
                    <input
                        type="text"
                        placeholder="Job type"
                        name="jobType"
                        value={job?.jobType}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label>Requirements:</label>
                    <input
                        type="text"
                        placeholder="Job requirements"
                        name="jobRequirements"
                        value={job?.jobRequirements}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label>location:</label>
                    <br />
                    <label>city:</label>
                    <input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={job?.city}
                        onChange={handleInputChange}
                    />
                    <label>Province:</label>
                    <input
                        type="text"
                        placeholder="Province"
                        name="province"
                        value={job?.province}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label>Job Description:</label>
                    <ReactQuill
                        theme="snow"
                        value={jobDescription}
                        onChange={setJobDescription}
                        modules={JobForm.modules}
                        formats={JobForm.formats}
                    />

                    <div className="--my">
                        <button type="submit" className="--btn --btn-primary">
                            Save Job
                        </button>
                    </div>
                </form>
            </Card>
        </div>
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