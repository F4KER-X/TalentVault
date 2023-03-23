import NavbarCSS from '../assets/styling/Navbar.module.css'
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectName,
  selectPhoto,
  selectRole,
  SET_CLEAR,
} from "../redux/features/auth/authSlice";
import { logoutUser } from "../redux/features/auth/authService";
import { useNavigate } from "react-router-dom";
import logoutt from "../assets/images/log-out.png";
import Logo from "./Logo_no_text";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai"
import { CiLogout } from "react-icons/ci"
import { CgProfile } from "react-icons/cg"
import { MdWorkOutline } from "react-icons/md"
import { IoCreateOutline } from "react-icons/io5";
import UseRedirectLoggedOutUser from '../hook/useRedirectLoggedOutUser';
import { SET_JOB } from '../redux/features/job/jobSlice';



const Navbar = () => {
  UseRedirectLoggedOutUser()

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
    dispatch(SET_CLEAR())
    dispatch(SET_JOB())
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
                address={"/profile"}
                icon={<CgProfile />}
                text={"My Profile"}
              />


              {role === 'applicant' && (<DropdownItem
                address={"/dashboard"}
                icon={<AiOutlineHome />}
                text={"Dashboard"}
              />)}


              {role === 'recruiter' && (<DropdownItem
                address={"/job/create-job"}
                icon={<IoCreateOutline />}
                text={"Create A Job"}
              />)}

              {role === "recruiter" && (
                <DropdownItem address={"/job/my-jobs"} text={"My Jobs"} icon={<MdWorkOutline />} />
              )}
              {role === "applicant" && (
                <DropdownItem text={"My applications"} icon={<MdWorkOutline />} />
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
