import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectName, SET_LOGIN } from "../redux/features/auth/authSlice";
import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { ShowOnLogin } from "../components/protect/hiddenLinks";
import UserRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";

export default function Test() {
  UserRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstName = useSelector(selectName);

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
      </ShowOnLogin>
      <div>Name: {firstName}</div>
    </div>
  );
}
