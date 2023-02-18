import React, { useState } from "react";
import Logo from "../components/Logo_no_text";
import FormRow from "../components/FormRow";
import "../index.css";
import Wrapper from "../assets/styling/RegisterPage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../services/authService";
import { SET_LOGIN, SET_NAME } from "../redux/features/auth/authSlice";
import Loader from "../components/Loader";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);

  const { email, password } = formData;

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

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

    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.firstName));
      navigate("/test");
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
