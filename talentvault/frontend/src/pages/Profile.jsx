import React, { useState, useEffect } from "react";
import Wrapper from "../assets/styling/RegisterPage";
import FormRow from "../components/FormRow";
function Profile() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
  });

  const { firstname, lastname, phonenumber } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const [fileData, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={{ onSubmit }}>
        <h3 className="form-title">Edit Profile</h3>

        
          <FormRow
            type="firstname"
            labelText="First name"
            className="form-control"
            placeholder="Jane"
            name="firstname"
            value={firstname}
            onChange={onChange}
          />
       

          <FormRow
            type="lastname"
            labelText="Last name"
            className="form-control"
            placeholder="Doe"
            name="lastname"
            value={lastname}
            onChange={onChange}
          />
       

        
          <FormRow
            type="phonenumber"
            labelText="Phone number"
            className="form-control"
            name="phonenumber"
            value={phonenumber}
            onChange={onChange}
          />
        

        <div className="file-group">
          <label>Add Profile Picture</label>
          <input
            type="file"
            labelText="Add Profile Pic"
            className="file-control"
            name="picture"
            id="picture"
            onChange={handleChange}
          />
          {/* <img src={file} />   */}
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

       
          <button type="submit" className="btn btn-block" >
            Submit
          </button>
       
      </form>
    </Wrapper>
  );
}

export default Profile;
