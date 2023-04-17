import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footerwrapper">
      <div className="main-footer">
        <div className="container">
          <div className="intro-text">
            <h3>TalentVault</h3>
            <p className="intro-text2">
              {" "}
              TalentVault is a career-services platform that helps applicants
              find their dream job, and helps recruiters find their dream
              applicant!
            </p>
          </div>
          <div className="hold-text">
            <div className="footer-cols">
              <ul className="footer-links">
                <p className="titlefooter"> General</p>
                <li>
                  <Link>HOME</Link>
                </li>
                <li>
                  <Link>About Us</Link>
                </li>
                <li>
                  <Link>BLOG</Link>
                </li>
              </ul>
            </div>

            <div className="footer-cols">
              <ul className="footer-links">
                <p className="titlefooter">Help</p>
                <li>
                  <Link to="/reportbug">Report Bug</Link>
                </li>
                <li>
                  <Link>FAQ</Link>
                </li>
                <li>
                  <Link>Leave a Review</Link>
                </li>
              </ul>
            </div>

            <div className="footer-cols">
              <ul className="footer-links">
                <p className="titlefooter"> Follow Our Socials</p>
                <li className="faicon">
                  <FontAwesomeIcon icon={faTwitter} />
                </li>
                <li className="faicon">
                  <FontAwesomeIcon icon={faInstagram} />
                </li>
                <li className="faicon">
                  <FontAwesomeIcon icon={faFacebook} />
                </li>
              </ul>
            </div>
          </div>

          <div className="row-footer">
            <p className="intro-text2">
              &copy;{new Date().getFullYear()} TalentVault Corporation | Terms
              of Services | Privacy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
