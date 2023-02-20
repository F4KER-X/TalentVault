import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectName,
  selectPhoto,
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
      <div className="container">
        <img src={photo} alt="should be a photo"></img>
        <p>Welcome {firstName}</p>
      </div>
    </div>
  );
}
