import React from 'react'
import "./JobForm.css";

function JobFilter() {


  return (
    <>
    <div>
    <div className="filter-div">
          <div className="floater2">
            <select
              name="jobType"
              id="jobType"
              className="employment-type-select" 
            >
              <option  hidden className="dropdown_options" value="hidden-title">
                Employment Type
              </option>
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
        

        <div className="floater2">
          <select
            name="workType"
            id="workType"
            className="remote-type-select"
          >
            <option className="dropdown_options" value="hidden-title">
              Remote
            </option>
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
        
      
    </div>
  </div>
  </>
  )
}

export default JobFilter
