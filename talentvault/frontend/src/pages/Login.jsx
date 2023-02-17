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

  role: "",
  isUser: true,
};

function Login() {
  //local state
  const [formData, setFormData] = useState(initialState);

  //Global state
  const { isLoading, showAlert, displayAlert, registerUser, PasswordAlert } =
    useAppContext();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password, isUser } = formData;
    if (!email || !password) {
      displayAlert();
      return;
    }

    const currentUser = { email, password };
    if (isUser) {
      console.log("already  a member");
    } else {
      registerUser(currentUser);
    }
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>Sign in</h3>
        {showAlert && <Alert />}

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

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>

        <p>
          Don't have an account yet?
          <button
            type="button"
            className="member-btn"
            onClick={() => {
              window.location.href = "/register";
            }}
          >
            Sign Up
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

export default Login;
