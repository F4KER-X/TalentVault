import React, { useState } from "react";
import Logo from "../components/Logo_no_text";
import FormRow from "../components/FormRow";
import "../index.css";
import Wrapper from "../assets/styling/WrapperRegisterPage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../redux/features/auth/authService";
import {
  SET_COMPANY,
  SET_EMAIL,
  SET_ID,
  SET_LOGIN,
  SET_NAME,
  SET_PHOTO,
  SET_ROLE,
} from "../redux/features/auth/authSlice";
import Loader from "../components/Loader";
import UseRedirectLoggedInUser from "../hook/useRedirectLoggedInUser";

const initialState = {
  email: "",
  password: "",
};

export default function LoginPage() {
  UseRedirectLoggedInUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);

  const { email, password } = formData;

  // Handle input change
  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };
  // Handle login
  const login = async (ev) => {
    ev.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };

    // Login user
    setIsLoading(true);
    try {
      
      const data = await loginUser(userData);
      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(data.firstName));
      dispatch(SET_PHOTO(data.profilePicUrl.URL));
      dispatch(SET_ROLE(data.role));
      dispatch(SET_ID(data.id));
      dispatch(SET_COMPANY(data.companyName));
      dispatch(SET_EMAIL(data.email));

      if (data.role === "recruiter") navigate("/job/my-jobs");
      if (data.role === "applicant") navigate("/dashboard");
      
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Wrapper className="full-page">
        {isLoading && <Loader />}

        <form className="form" onSubmit={login}>
          <Logo />
          <h3>Sign in</h3>

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

          <button
            type="submit"
            className="btn btn-block"
            /*disabled={isLoading}*/
          >
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
    </div>
  );
}
