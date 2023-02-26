import Wrapper from "../assets/styling/Navbar";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectName,
  selectPhoto,
  selectRole,
  SET_LOGIN,
} from "../redux/features/auth/authSlice";
import { logoutUser } from "../redux/features/auth/authService";
import { Link, useNavigate } from "react-router-dom";
import user from "../assets/images/user.png";
import edit from "../assets/images/edit.png";
import inbox from "../assets/images/envelope.png";

import logoutt from "../assets/images/log-out.png";
import UserRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";
import Logo from "./Logo_no_text";

import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  UserRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstName = useSelector(selectName);
  const photo = useSelector(selectPhoto);
  const role = useSelector(selectRole);
  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const logout = async (e) => {
    e.preventDefault();
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };
  return (
    <Wrapper>
      <nav className="navbar">
        <Logo className="logo" />

        <GiHamburgerMenu size={24} className="burger cursor-pointer" />

        <div className="menu-container" ref={menuRef}>
          <div
            className="menu-trigger"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <img src={photo}></img>
          </div>
          <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
            <h3>
              {firstName} <br />
              <span>{role}</span>
            </h3>
            <u1>
              <DropdownItem
                address={"/profile"}
                img={user}
                text={"My Profile"}
              />
              <DropdownItem
                img={edit}
                address={"/profile"}
                text={"Edit Profile"}
              />
              {role === "applicant" && (
                <DropdownItem img={inbox} text={"My Jobs"} />
              )}
              {role === "recruiter" && (
                <DropdownItem img={inbox} text={"My postings"} />
              )}
              {role === "admin" && (
                <DropdownItem img={inbox} text={"Admin panel"} />
              )}
              <LogoutBtn img={logoutt} />
            </u1>
          </div>
        </div>
      </nav>
    </Wrapper>
  );
  function LogoutBtn(props) {
    return (
      <Wrapper>
        <li className="dropdownItem">
          <img src={props.img} alt="" />
          <button className="logout" onClick={logout}>
            Logout
          </button>
        </li>
      </Wrapper>
    );
  }
};

function DropdownItem(props) {
  return (
    <Wrapper>
      <li className="dropdownItem">
        <img src={props.img} alt="" />
        <a href={props.address}>{props.text}</a>
      </li>
    </Wrapper>
  );
}

export default Navbar;
