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
import { AiOutlineHome } from "react-icons/ai"
import { CiLogout } from "react-icons/ci"
import { CgProfile } from "react-icons/cg"
import { MdWorkOutline } from "react-icons/md"

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
      <nav className="navbar-n">
        <Logo className="logo" />

        <GiHamburgerMenu size={24} className="burger cursor-pointer" />

        <div className="menu-container" ref={menuRef}>
          <div
            className="menu-trigger"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <img src={photo} alt=""></img>
          </div>
          <div className={`dropdown-menu-n ${open ? "active" : "inactive"}`}>
            <h3>
              Hello {firstName}! <br />
              <span>{role}</span>
            </h3>
            <ul>
              <DropdownItem
                address={"/dashboard"}
                icon={<AiOutlineHome />}
                text={"Dashboard"}
              />
              <DropdownItem
                address={"/profile"}
                icon={<CgProfile />}
                text={"My Profile"}
              />

              {role === "applicant" && (
                <DropdownItem 
                address={"applications"}
                text={"My Jobs"} 
                icon={<MdWorkOutline />} />
              )}
              {role === "recruiter" && (
                <DropdownItem text={"My postings"} icon={<MdWorkOutline />} />
              )}
              {role === "admin" && (
                <DropdownItem text={"Admin panel"} />
              )}
              <LogoutBtn img={logoutt} />
            </ul>
          </div>
        </div>
      </nav>
    </Wrapper>
  );
  function LogoutBtn(props) {
    return (
      <Wrapper>
        <li className="dropdownItem">

          <button className="logout" onClick={logout}>
            <CiLogout /> Logout
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
        <a href={props.address}> {props.icon} {props.text}</a>
      </li>
    </Wrapper>
  );
}

export default Navbar;
