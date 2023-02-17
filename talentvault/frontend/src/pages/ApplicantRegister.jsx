import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormRow from "../components/FormRow";
import "../index.css";

function ApplicantRegister() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    telnumber: ""
  });

  const { firstname, lastname, telnumber } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const navigate = useNavigate();
  const navigateToPage = () => {
    navigate("/dashboard");
  };

  const [fileData, setFile]=useState()
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
 
 
  return (
    <>
      <div className="form-container">
        <form className="signup-form" onSubmit={{ onSubmit }}>
          <div className="form-content">
            <h3 className="form-title">Please enter your information</h3>

              <FormRow
                type="text"
                labelText="First name"
                className="form-control"
                placeholder="Please enter your first name"
                name="firstname"
                value={firstname}
                onChange={onChange}
              />
          
              <FormRow
                type="text"
                labelText="Last name"
                className="form-control"
                placeholder="Please enter your last name"
                name="lastname"
                value={lastname}
                onChange={onChange}
              />

        <FormRow
          type= "tel"
          labelText="Phone Number"
          name="telnumber"
          value={telnumber}
          onChange={onChange}
        />

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


            
              <button type="submit" className="btn btn-block" onClick={navigateToPage}>
                Submit
              </button>
      
          </div>
        </form>
      </div>
    </>
  );
}

export default ApplicantRegister;
