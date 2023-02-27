import React, { useState, useEffect } from "react";
import Wrapper from "../assets/styling/RegisterPage";
import FormRow from "../components/FormRow";

import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { SpinnerImg } from "../components/Loader";
import { ShowOnLogin } from "../components/protect/hiddenLinks";
import UserRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";
import {
  SET_LOGIN,
  SET_NAME,
  SET_USER,
} from "../redux/features/auth/authSlice";
import { getUserProfile } from "../redux/features/auth/authService";



function Profile() {

    UserRedirectLoggedOutUser("/login");
    const dispatch = useDispatch();
  
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      setIsLoading(true);
      async function getUserData() {
        const data = await getUserProfile();
        setProfile(data);
        setIsLoading(false);
        dispatch(SET_USER(data));
        dispatch(SET_NAME(data.firstName + " " + data.lastName));
      }
      getUserData();
    }, [dispatch]);
  


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    profilePicUrl: "",
    resume: ""
  });

  const { firstName, lastName, phoneNumber } = formData;

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
        <h3 className="form-title">Profile</h3>

        <p>First name: {profile?.firstName}</p>

          <FormRow
            type="firstName"
            labelText="First name"
            className="form-control"
            placeholder="Jane"
            name="firstName"
            value={firstName}
            onChange={onChange}
          />
       

          <FormRow
            type="lastName"
            labelText="Last name"
            className="form-control"
            placeholder="Doe"
            name="lastName"
            value={lastName}
            onChange={onChange}
          />
       

        
          <FormRow
            type="phoneNumber"
            labelText="Phone number"
            className="form-control"
            name="phoneNumber"
            value={phoneNumber}
            onChange={onChange}
          />
        

          <FormRow
            type="file"
            labelText="Add Profile Pic"
            className="file-control"
            name="profilePicUrl"
            id="profilePicUrl"
            onChange={onChange}
          />
        

          <FormRow
            type="file"
            className="file-control"
            name="resume"
            id="resume"
            onChange={onChange}
          />

       
          <button type="submit" className="btn btn-block" >
            Edit Profile
          </button>
       
      </form>
    </Wrapper>
  );
}

export default Profile;
