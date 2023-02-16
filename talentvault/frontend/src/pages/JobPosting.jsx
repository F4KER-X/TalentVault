
import React, { useState, useEffect } from "react"
import '../index.css';





function JobPosting() {
  
    const [formData, setFormData]=useState({
    
        jobtitle:'',
        remotejob: '',
        employmenttype:'',
        jobloc:'',
       })
    
       
     const {jobtitle,remotejob, employmenttype,jobloc}= formData
    
     const onChange= (e) => {
      setFormData((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value,
        
      }))
     }
    
     const onSubmit=(e)=> {
      e.preventDefault()
    
     }
  
  
    return (
    <>
    
    <div className="form-container">
   
   <form className="signup-form" onSubmit={{onSubmit}}>
       <div className="form-content">
       <h3 className="form-title">Your Job Posting</h3>
      
     
   
     <div className="form-group">
       <label>Job Title</label>
       <input
         type="text"
         className="form-control"
         placeholder="Enter job title"
         name="jobtitle"
         id="jobtitle"
         value={jobtitle}
         onChange={onChange}
       />
     </div>

     <div className="form-group">
       <label>Job Location</label>
       <input
         type="text"
         className="form-control"
         placeholder="Enter job title"
         name="jobloc"
         id="jobloc"
         value={jobloc}
         onChange={onChange}
       />
     </div>



     <div className="form-group">
          <label id="checkboxlabel">This role can be performed as a "remote work from home" job</label>
          <input 
          type="checkbox"
          className="form-control-checkbox"
          name="remotejob"
          id="remotejob"
          value={remotejob}
          onChange={onChange}
          unchecked
          /> 
        </div>

    <div className="form-group">
       <label>Employment Type:</label>
       <select 
         name="employment_type"
         className="form-control"
         id="employmenttype"
         value={employmenttype}
         onChange={onChange}
         aria-required="true"
       >
       <option  className="dropdown_options" value="full_time">Full-Time</option>
       <option  className="dropdown_options"  value="part_time">Part-Time</option>
       <option  className="dropdown_options" value="contractor">Contractor</option>
       <option  className="dropdown_options" value="temporary">Temporary</option>
       <option  className="dropdown_options" value="other">Other</option>
      </select>
     </div>


     <div className="form-group">
       <label>Job Description</label>
        <textarea 
        type="textarea"
        className="form-control-text-area"
        name="jobdescription"
        id="jobdescription"
        placeholder="Please paste your job description here"
        />
       </div>
     </div>

     

     


     <div className="btndiv">
       <button type="submit" className="btn">
         Save and Continue
       </button>
     </div>
   
   
   </form>
   </div>
    </>
  )
}

export default JobPosting
