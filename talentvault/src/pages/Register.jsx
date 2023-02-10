import React, { useState, useEffect } from "react"
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
         <button type="submit" className="btn">
           Submit
         </button>
       </div>

       <p className="forgotpassword">
         Forgot <a className="form-forgot-pwd" href="#">password?</a>
       </p>
     </div>
     
     
     </form>
     </div>
    
     </>

  )
}

export default Register
