import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../index.css";



export default function About() {
    return(
    <>
      <Navbar/>
      <div className="container">
        <div className="content-about">
            <div className="description-about">
                <h2 className="AboutTitle">About TalentVault</h2>
                <p>Welcome to TalentVault! Our mission is to create a platform where employers and job seekers can connect. We strive to help employers find the right job for them in the easiest way possible.</p>
                <p>We are passionate about what we do, and we are committed to providing the best possible service to our clients. 
                   TalentVault not only provdes easy access to job postings, but also lets employees customize their profile to help them stand out in a croud of applicants.
                   Whether you're a job seeker looking for your next career move or an employer looking to hire top talent, we're here to help. 
                </p>
            </div>
            <div className="image-about">
                <picture>
                    <img src="https://www.bvoip.com/hubfs/We-are-hiring.png" alt></img>
                </picture>
            </div>
        </div>
        <div className="content-about2">
            <div className="image-about2">
                    <picture>
                        <img src="https://icons.veryicon.com/png/128/healthcate-medical/his-icon/data-graph-8.png" alt></img>
                    </picture>
            </div>
            <div className="description-about2">
                <p>Over 90% of our job seekers receive at least one job offer within 60 days of signing up</p>
                <p>Our clients have reported a 30% increase in productivity after hiring through our website</p>
            </div>
        </div>
        <div className="content-about3">
            <a href="mailto:email@example.com">Contact our support team here</a>
        </div>
      </div>
    </>
    );
}