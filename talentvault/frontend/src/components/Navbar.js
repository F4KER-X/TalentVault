import NavbarCSS from '../assets/styling/Navbar.module.css'
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectName,
  selectPhoto,
  selectRole,
  SET_LOGIN,
} from "../redux/features/auth/authSlice";
import { logoutUser } from "../redux/features/auth/authService";
import { useNavigate } from "react-router-dom";
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
    <>
      <nav className={NavbarCSS.myNavbar}>
        <Logo className={NavbarCSS.myLogo} />

        <GiHamburgerMenu size={24} className={`${NavbarCSS.myBurger} ${NavbarCSS.myCursorPointer}`} />

        <div ref={menuRef}>
          <div
            className={NavbarCSS.myMenuTrigger}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <img src={photo} alt=""></img>
          </div>
          <div className={`${NavbarCSS.myDropdownMenu} ${open ? NavbarCSS.active : NavbarCSS.inactive}`}>
            <h3 className={NavbarCSS.h3}>
              Hello {firstName}! <br />
              <span >{role}</span>
            </h3>
            <ul className={NavbarCSS.ul}>
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

              {role === "recruiter" && (
                <DropdownItem text={"My Jobs"} icon={<MdWorkOutline />} />
              )}
              {role === "applicant" && (
                <DropdownItem text={"My applications"} icon={<MdWorkOutline />} />
              )}
              {role === "admin" && (
                <DropdownItem text={"Admin panel"} />
              )}
              <LogoutBtn img={logoutt} />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
  function LogoutBtn(props) {
    return (
      <li className={NavbarCSS.myDropdownItem}>
        <button className={NavbarCSS.myLogout} onClick={logout}>
          <CiLogout /> Logout
        </button>
      </li>
    );
  }
};

function DropdownItem(props) {
  return (

    <li className={NavbarCSS.myDropdownItem}>
      <a className={NavbarCSS.atag} href={props.address}> {props.icon} {props.text}</a>
    </li>

  );
}

export default Navbar;
