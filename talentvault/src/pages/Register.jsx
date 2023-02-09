import React, { useState, useEffect } from "react"



function Register() {
  const [formData, setFormData]=useState({
    firstname: '',
    lastname: '',
    email:'',
    password:'',
    confirmpassword:''
   })

   
 const {firstname, lastname,email,password,confirmpassword}= formData

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

       
         <div className="form-group mt-3">
         <label>First Name</label>
         <input
           type="text"
           className="form-control mt-1"
           placeholder="Enter your first name"
           name="firstname"
           id="firstname"
           value={firstname}
           onChange={onChange}
         />
       </div>

       <div className="form-group mt-3">
         <label>Last Name</label>
         <input
           type="text"
           className="form-control mt-1"
           placeholder="e.g Doe"
           name="lastname"
           id="lastname"
           value={lastname}
           onChange={onChange}
         />
       </div>

       <div className="form-group mt-3">
         <label>Email address</label>
         <input
           type="email"
           className="form-control mt-1"
           placeholder="JaneDoe@email.com"
           name="email"
           id="email"
           value={email}
           onChange={onChange}
         />
       </div>

       <div className="form-group mt-3">
         <label>Password</label>
         <input
           type="password"
           className="form-control mt-1"
           placeholder="Password"
           name="password"
           id="password"
           value={password}
           onChange={onChange}
         />
       </div>

       <div className="form-group mt-3">
         <label>Confirm Password</label>
         <input
           type="password"
           className="form-control mt-1"
           placeholder=" Confirm Password"
           name="confirmpassword"
           id="confirmpassword"
           value={confirmpassword}
           onChange={onChange}
         />
       </div>

       <div className="d-grid gap-2 mt-3">
         <button type="submit" className="btn btn-primary">
           Submit
         </button>
       </div>

       <p className="text-center mt-2">
         Forgot <a href="#">password?</a>
       </p>
     </div>
     
     
     </form>
     </div>
    
     </>

  )
}

export default Register
