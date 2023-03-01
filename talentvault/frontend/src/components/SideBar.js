import React, { useState } from "react";
import Icon from "../assets/images/Icon.svg";
import Profile from "../assets/images/profile.png";
import Dashboard from "../assets/images/dashboard.svg";
import Transactions from "../assets/images/transactions.svg";
import Performance from "../assets/images/performance.svg";
import News from "../assets/images/news.svg";
import Settings from "../assets/images/settings.svg";
import Support from "../assets/images/support.svg";
import { useLocation } from "react-router-dom";
import Wrapper from "../assets/styling/SideBar";
const Sidebar = () => {
  const location = useLocation();

  const [closeMenu, setCloseMenu] = useState(false);

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
  };

  return (
    <Wrapper>
      <div className={closeMenu === false ? "sidebar" : "sidebar active"}>
        <div
          className={
            closeMenu === false ? "logoContainer" : "logoContainer active"
          }
        >
          <img src={Icon} alt="icon" className="logo" />
          <h2 className="title">evergreen. </h2>
        </div>
        <div
          className={
            closeMenu === false ? "burgerContainer" : "burgerContainer active"
          }
        >
          <div
            className="burgerTrigger"
            onClick={() => {
              handleCloseMenu();
            }}
          ></div>
          <div className="burgerMenu"></div>
        </div>
        <div
          className={
            closeMenu === false ? "profileContainer" : "profileContainer active"
          }
        >
          <img src={Profile} alt="profile" className="profile" />
          <div className="profileContents">
            <p className="name">Hello, John👋</p>
            <p>johnsmith@gmail.com</p>
          </div>
        </div>
        <div
          className={
            closeMenu === false
              ? "contentsContainer"
              : "contentsContainer active"
          }
        >
          <ul>
            <li className={location.pathname === "/" ? "active" : ""}>
              <img src={Dashboard} alt="dashboard" />
              <a href="/">dashboard</a>
            </li>
            <li
              className={location.pathname === "/transactions" ? "active" : ""}
            >
              <img src={Transactions} alt="transactions" />
              <a href="/transactions">transactions</a>
            </li>
            <li className={location.pathname === "/profile" ? "active" : ""}>
              <img src={Performance} alt="Performance" />
              <a href="/profile">profile</a>
            </li>
            <li className={location.pathname === "/news" ? "active" : ""}>
              <img src={News} alt="News" />
              <a href="/news">news</a>
            </li>
            <li className={location.pathname === "/settings" ? "active" : ""}>
              <img src={Settings} alt="Settings" />
              <a href="/settings">settings</a>
            </li>
            <li className={location.pathname === "/support" ? "active" : ""}>
              <img src={Support} alt="Support" />
              <a href="/support">support</a>
            </li>
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

export default Sidebar;

// import Wrapper from "../assets/styling/SideBar";
// const SideBar = () => {
//   return (
//     <>
//       <div className="left-side">
//         <img
//           src={"https://img-b.udemycdn.com/user/200_H/118256236_6100.jpg"}
//           classname="profile"
//         />
//         <h3>Name</h3>
//         <ul>
//           <Item addres={"Profile"} text={"Profile"} />
//           <Item addres={"Photo"} text={"Photo"} />
//           <Item addres={"EditProfile"} text={"Edit Profile"} />
//         </ul>
//       </div>
//     </>
//   );

//   function Item(props) {
//     return (
//       <Wrapper>
//         <li className="dropdownItem">
//           <a href={props.address}>{props.text}</a>
//         </li>
//       </Wrapper>
//     );
//   }
// };

// export default SideBar;
