import React from "react";
import "./Footer.css"

const Footer = () => {
  return (
    <div className="main-footer">
        <div className="container">
            <div className="row">
               
                <div className="col-footer">
                <a href="#">About Us</a>
                </div>
               
                <div className="col-footer">
                <a href="#">Services</a>
                </div>
            
                <div className="col-footer">
                <a href="#">Manage Your Account</a>
                </div>
                
            </div>
            <div className="row-footer">
                <p className="col-sm">
                    &copy;{new Date().getFullYear()} TalentVault Corporation | Terms of Services | Privacy
                </p>
            </div>
        </div>
    </div>
  );
};
export default Footer;