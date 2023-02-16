import React, { useState, useEffect } from "react";
import "../index.css";
import Wrapper from "../assets/styling/RegisterPage";
import FormRow from "../components/FormRow";
function RecruiterRegister() {
  const [formData, setFormData] = useState({
    companyname: "",
  });

  const { companyname } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <div className="form-content">
          <h3 className="form-title">Tell Us About Your Company</h3>

        <FormRow
              type="text"
              labelText="Company Name"
              name="companyname"
              value={companyname}
              onChange={onChange}
             />


      
            <button type="submit" className="btn btn-block">
              Submit
            </button>
        
        </div>
      </form>
    </Wrapper>
  );
}

export default RecruiterRegister;
