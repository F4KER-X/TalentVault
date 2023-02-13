import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../index.css';


function Register() {
  const [formData, setFormData]=useState({
    usertype: '',
    email:'',
    password:'',
    confirmpassword:''
   })

   
 const {usertype,email,password,confirmpassword}= formData

 const onChange= (e) => {
  setFormData((prevState)=>({
    ...prevState,
    [e.target.name]: e.target.value,
    
  }))
 }

 const onSubmit=(e)=> {
  e.preventDefault()

 }


 const checkBox= document.querySelector('#usertype');
 const navigate = useNavigate();
 const navigateToPage= () => {
  if(checkBox.checked){
     navigate("/recruiterregister");
  }
  else{
    navigate("/applicantregister");
  }
 }



 



  return (
   
    <>    

    <div className="form-container">

     <form className="signup-form" onSubmit={{onSubmit}}>
         <div className="form-content">
         <h3 className="form-title">Sign Up</h3>
         <p className="form-subtitle"> Already have an account?  <a className="form-signin" href="#">Sign In</a></p>

        <div className="form-group">
          <label id="checkboxlabel">I am a recruiter </label>
          <input 
          type="checkbox"
          className="form-control-checkbox"
          name="usertype"
          id="usertype"
          value={usertype}
          onChange={onChange}
          unchecked
          /> 
        </div>

       <div className="form-group">
         <label>Email address</label>
         <input
           type="email"
           className="form-control"
           placeholder="JaneDoe@email.com"
           name="email"
           id="email"
           value={email}
           onChange={onChange}
         />
       </div>

       <div className="form-group">
         <label>Password</label>
         <input
           type="password"
           className="form-control"
           placeholder="Password"
           name="password"
           id="password"
           value={password}
           onChange={onChange}
         />
       </div>

       <div className="form-group ">
         <label>Confirm Password</label>
         <input
           type="password"
           className="form-control"
           placeholder=" Confirm Password"
           name="confirmpassword"
           id="confirmpassword"
           value={confirmpassword}
           onChange={onChange}
         />
       </div>

       <div className="btndiv">
         <button id="submitbtn" type="submit" className="btn" onClick={navigateToPage}>
           Submit
         </button>
       </div>

      
     </div>
     
     
     </form>
     </div>
    

   

     </>
    

  )
}

export default Register
