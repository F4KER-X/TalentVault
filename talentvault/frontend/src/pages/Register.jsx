import React, { useState, useEffect } from "react";
import Logo from "../components/Logo_no_text";
import FormRow from "../components/FormRow";
import Alert from "../components/Alert";
import "../index.css";
import Wrapper from "../assets/styling/RegisterPage";
import { useAppContext } from "../context/appContext";

//Local state
const initialState = {
  name: "",
  usertype: "",
  email: "",
  password: "",
  confirmpassword: "",
  role: "applicant",
  isUser: false,
};

function Register() {
  //local state
  const [formData, setFormData] = useState(initialState);

  //Global state
  const { isLoading, showAlert, displayAlert, registerUser, PasswordAlert } =
    useAppContext();

  const toggle = () => {
    setFormData({ ...formData, isUser: !formData.isUser });
  };

  const onChange = (e) => {
    if (e.target.checked) {
      formData.role = "recruiter";
    } else {
      formData.role = "applicant";
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password, isUser, confirmpassword } = formData;
    if (!email || !password || !confirmpassword) {
      displayAlert();
      return;
    }

    if (!(password === confirmpassword)) {
      PasswordAlert();
      return;
    }
    const currentUser = { email, password };

    registerUser(currentUser);
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>Sign up</h3>
        {showAlert && <Alert />}

        <div className="form-row checkbox">
          <label htmlFor="name" className="form-label ">
            I'm a recruiter
          </label>
          <input
            type="checkbox"
            //   className="form-control-checkbox"
            name="usertype"
            className="check"
            id="usertype"
            value={formData.usertype}
            onChange={onChange}
          />
        </div>

        <FormRow
          type="text"
          labelText="Full Name"
          name="name"
          value={formData.name}
          onChange={onChange}
        />

        <FormRow
          type="email"
          labelText="Email Address"
          name="email"
          value={formData.email}
          onChange={onChange}
        />

        <FormRow
          type="password"
          labelText="Password"
          name="password"
          value={formData.password}
          onChange={onChange}
        />

        <FormRow
          type="password"
          labelText="Confirm Password"
          name="confirmpassword"
          value={formData.confirmpassword}
          onChange={onChange}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>

        <p>
          Already have an account?
          <button
            type="button"
            className="member-btn"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Sign In
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register;
