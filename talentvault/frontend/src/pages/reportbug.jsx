import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import "../index.css";
import Footer from "../components/Footer";
import FormRow from "../components/FormRow";
import {validateEmail } from "../redux/features/auth/authService";

//install in terminal npm i @emailjs/browser
//email is talentvaultteam@gmail.com
//password: talent.123

const ReportBug = () => {
    const form = useRef();


    const sendEmail = (e) => {
      e.preventDefault();

  
      emailjs
        .sendForm(
        'service_qx16pfs', 
        'template_srv0x6h', 
        form.current, 
        'o14Oeq98MTA3ABs4x'
        )
        .then(
            (result) => {
                console.log(result.text);
                toast.success("Message sent succesfully");
            }, 
            (error) => {
                console.log(error.text);
            }
        );
        e.target.reset();

    };

    return (
        <>
        <div>
        {<Loader />}
        <Navbar />

        <h3 style={{ textAlign: "center", marginTop: "20px" }}>
            Report Bug
        </h3>
        <form ref={form} onSubmit={sendEmail}>
        <div className = "form">
            <div className="bugUser">
                <h5>Submit new bug report</h5>
                <FormRow
                    type="text"
                    name="user_name"
                    labelText="Name"
                />

            </div>

            <div className="bugEmail">
                <FormRow
                    type="email"
                    name="user_email"
                    labelText="Email"
                />
            </div>

            <div className="bugMessage">
                <label className="form-label">Message</label>
                <textarea
                    placeholder="Describe the issue in detail"
                    name="user_message"
                    className="form-textarea"
                />
            </div>

            <div className="btndiv">
                <button type="submit" className="btn" value="Send">
                    Submit
                </button>
            </div>

        </div>
        </form>
        </div>
        <Footer/>
        </>
    )
};


export default ReportBug;



