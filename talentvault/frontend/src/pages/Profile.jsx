import React, { useState, useEffect } from "react";
import Wrapper from "../assets/styling/RegisterPage";

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

        <div className="form-group">
          <label>First Name</label>
          <input
            type="firstname"
            className="form-control"
            placeholder="Jane"
            name="firstname"
            id="firstname"
            value={firstname}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="lastname"
            className="form-control"
            placeholder="Doe"
            name="lastname"
            id="lastname"
            value={lastname}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="phonenumber"
            className="form-control"
            name="phonenumber"
            id="phonenumber"
            value={phonenumber}
            onChange={onChange}
          />
        </div>

        <div className="file-group">
          <label>Add Profile Picture</label>
          <input
            type="file"
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

        <div className="btndiv">
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default Profile;
