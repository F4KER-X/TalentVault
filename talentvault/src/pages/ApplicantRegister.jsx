import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../index.css';



function ApplicantRegister() {

  const [formData, setFormData]=useState({
    
    firstname:'',
    lastname:''
   })

   
 const {firstname,lastname}= formData

 const onChange= (e) => {
  setFormData((prevState)=>({
    ...prevState,
    [e.target.name]: e.target.value,
    
  }))
 }

 const onSubmit=(e)=> {
  e.preventDefault()

 }

 const [fileData, setFile]=useState()
 function handleChange(e) {
   console.log(e.target.files);
   setFile(URL.createObjectURL(e.target.files[0]));
 }


 
 const navigate = useNavigate();
 const navigateToPage= () => {
     navigate("/dashboard");
 }




  return (
    <>
     <div className="form-container">

<form className="signup-form" onSubmit={{onSubmit}}>
    <div className="form-content">
    <h3 className="form-title">Please enter your information</h3>
   
  

  <div className="form-group">
    <label>First Name</label>
    <input
      type="text"
      className="form-control"
      placeholder="Please enter your first name"
      name="firstname"
      id="firstname"
      value={firstname}
      onChange={onChange}
    />
  </div>

  <div className="form-group">
    <label>Last Name</label>
    <input
      type="text"
      className="form-control"
      placeholder="Please enter your last name"
      name="lastname"
      id="lastname"
      value={lastname}
      onChange={onChange}
    />
  </div>

  <div className="file-group">
         <label>Add Resume</label>
         <input 
            type="file"
            className="file-control" 
            name="resume"
            id="resume"
            onChange={handleChange}
         />         
           {/* <img src={file} />  */}
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

export default ApplicantRegister
