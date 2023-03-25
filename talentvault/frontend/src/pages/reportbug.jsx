import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../index.css";
import Footer from "../components/Footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FormRow from "../components/FormRow";
import "../assets/styling/profile.css";


function ReportBug() {
    return (
        <>
        <div>
        <Navbar />
        <h3 style={{ textAlign: "center", marginTop: "20px" }}>
            Report Bug
        </h3>
        <div className ="form">
            <div className="bugDetails">
                <h5>Submit new bug report</h5>
                <FormRow
                  type="text"
                  labelText="Email"
                  placeholder="Email"
                  name="email"
                />
            </div>

            <div className="bugPhoto">
                <form onSubmit={""}>
                    <label> Attach file </label>
                        <input
                         type="file"
                         className="form-control"
                         id="customFile"
                         onChange={""}
                         />
                         <button type="submit" className="btn-bug">
                             Upload
                         </button>
                </form>
            </div>

            <br/>
            
            <div className="bugDescription">
                <ReactQuill
                    theme="snow"
                    placeholder="Describe the issue in detail"
                    className={`jobdescriptionbox ${ ""
                        }`}
                />
            </div>

            <div className="btndiv">
                <button type="submit" className="btn">
                  Submit
                </button>
            </div>



        </div>
        </div>
        <Footer/>
        </>
    )
}

export default ReportBug;
