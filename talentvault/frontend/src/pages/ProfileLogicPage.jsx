import React, { useEffect, useState } from "react";
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
import { getUserProfile } from "../services/authService";

function ProfileLogicPage() {
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

  return (
    <div>
      {isLoading && <SpinnerImg />}
      <>
        {!isLoading && profile === null ? (
          <p>something went wrong</p>
        ) : (
          <div>
            <span>
              <img src={profile?.profilePicUrl} alt="profilepic" />
            </span>
            <p>First name: {profile?.firstName}</p>
            <p>Last name: {profile?.lastName}</p>
            {profile?.role === "recruiter" && (
              <p>Company name: {profile?.companyName}</p>
            )}
            <p>{profile?.resume}</p>
            <p>Phone number: {profile?.phoneNumber}</p>
            <p>Bio: {profile?.bio}</p>
            <p>Joined: {profile?.createdAt.split("T")[0]}</p>
            <p>Last updated: {profile?.updatedAt.split("T")[0]}</p>
          </div>
        )}
      </>
    </div>
  );
}

export default ProfileLogicPage;
