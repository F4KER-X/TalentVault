import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import '../index.css';




function RecruiterRegister() {
 
    const [formData, setFormData]=useState({
    
        companyname:'',
       })
    
       
     const {companyname}= formData
    
     const onChange= (e) => {
      setFormData((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value,
        
      }))
     }
    
     const onSubmit=(e)=> {
      e.preventDefault()
    
     }
 
     const navigate = useNavigate();
     const navigateToPage= () => {
         navigate("/jobposting");
     }
    
    
 
    return (
        <>
        <div className="form-container">
   
   <form className="signup-form" onSubmit={{onSubmit}}>
       <div className="form-content">
       <h3 className="form-title">Tell Us About Your Company</h3>
      
     
   
     <div className="form-group">
       <label>Company Name</label>
       <input
         type="text"
         className="form-control"
         placeholder="Company name"
         name="companyname"
         id="companyname"
         value={companyname}
         onChange={onChange}
       />
     </div>
   
     <div className="btndiv">
       <button type="submit" className="btn" onClick={navigateToPage}>
         Submit
       </button>
     </div>
   
    
   </div>
   
   
   </form>
   </div>
       </>
  )
}

export default RecruiterRegister
