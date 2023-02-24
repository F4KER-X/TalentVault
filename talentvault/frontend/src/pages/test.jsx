import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectName,
  selectPhoto,
  selectRole,
  SET_LOGIN,
} from "../redux/features/auth/authSlice";
import { logoutUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { ShowOnLogin } from "../components/protect/hiddenLinks";
import UserRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";
import "./test.css";

export default function Test() {
  UserRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstName = useSelector(selectName);
  const photo = useSelector(selectPhoto);
  const role = useSelector(selectRole);

  console.log(role);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };

  return (
    <div>
      <ShowOnLogin>
        <button onClick={logout} className="--btn --btn-danger">
          Logout
        </button>
        <Link to="/profile">
          <button>Profile</button>
        </Link>
      </ShowOnLogin>
      <div className="container1">
        <img src={photo} alt="hmm.jpg" className="img1"></img>
        <p className="p1">Welcome {firstName}</p>
        {role === "recruiter" ? (
          <p>This is a recruiter</p>
        ) : (
          <p>this is an applicant</p>
        )}
      </div>
    </div>
  );
}
