import React, { useState } from "react";
import Wrapper from "../assets/styling/RegisterPage";
import Logo from "../components/Logo_no_text";
import FormRow from "../components/FormRow";
import "../index.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  registerUser,
  validateEmail,
} from "../redux/features/auth/authService";
import { useNavigate } from "react-router-dom";
import {
  SET_LOGIN,
  SET_NAME,
  SET_PHOTO,
} from "../redux/features/auth/authSlice";
import Loader from "../components/Loader";
import UseRedirectLoggedInUser from "../hook/useRedirectLoggedInUser";

//Local state
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmpassword: "",
  companyName: "",
  role: "applicant",
};

function Register() {
  UseRedirectLoggedInUser("/test");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);

  const {
    firstName,
    lastName,
    email,
    password,
    confirmpassword,
    role,
    companyName,
  } = formData;

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };
  const register = async (ev) => {
    ev.preventDefault();

    if (!firstName || !email || !password || !lastName || !confirmpassword) {
      return toast.error("All fields are required");
    }
    if (
      role === "recruiter" &&
      (!firstName ||
        !email ||
        !password ||
        !lastName ||
        !companyName ||
        !confirmpassword)
    ) {
      return toast.error("All fields are required");
    }

    if (password.length < 8) {
      return toast.error("Passwords must be up to 8 characters");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    if (password !== confirmpassword) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
      role,
      companyName,
    };

    setIsLoading(true);

    try {
      const user = await registerUser(userData);

      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(user.firstName));
      await dispatch(SET_PHOTO(user.profilePicUrl));

      navigate("/test");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper className="full-page">
      {isLoading && <Loader />}
      <form className="form" onSubmit={register}>
        <Logo />
        <h3>Sign up</h3>

        <div className="form-row checkbox">
          <label htmlFor="role" className="form-label ">
            I'm a recruiter
          </label>
          <input
            type="checkbox"
            //   className="form-control-checkbox"
            name="role"
            className="check"
            id="role"
            checked={formData.role === "recruiter"}
            onChange={() =>
              setformData({
                ...formData,
                role: formData.role === "applicant" ? "recruiter" : "applicant",
              })
            }
          />
        </div>

        <FormRow
          type="text"
          labelText="First Name"
          name="firstName"
          value={firstName}
          onChange={handleInputChange}
        />
        <FormRow
          type="text"
          labelText="Last Name"
          name="lastName"
          value={lastName}
          onChange={handleInputChange}
        />

        {formData.role === "recruiter" && (
          <FormRow
            type="text"
            labelText="Company Name"
            name="companyName"
            value={companyName}
            onChange={handleInputChange}
          />
        )}

        <FormRow
          type="email"
          labelText="Email Address"
          name="email"
          value={email}
          onChange={handleInputChange}
        />

        <FormRow
          type="password"
          labelText="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />

        <FormRow
          type="password"
          labelText="Confirm Password"
          name="confirmpassword"
          value={confirmpassword}
          onChange={handleInputChange}
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
