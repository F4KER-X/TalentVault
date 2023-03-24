import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import {
  SET_COMPANY,
  SET_LOGIN,
  SET_NAME,
  SET_PHOTO,
} from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import DeleteModal from "../components/DeleteModal";

import {
  changePassword,
  deleteUser,
  getUserProfile,
  updateUserInfo,
  uploadFile,
  uploadPhoto,
} from "../redux/features/auth/authService";
import Navbar from "../components/Navbar";
import "../assets/styling/profile.css";
import "../index.css";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //states
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [email, setEmail] = useState(null);
  const [bio, setBio] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [role, setRole] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);

  //fetching data
  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      const data = await getUserProfile();
      const {
        firstName,
        lastName,
        companyName,
        email,
        bio,
        phoneNumber,
        profilePicUrl,
        role,
        resume,
      } = data;
      setRole(role);
      setFirstName(firstName);
      setLastName(lastName);
      setCompanyName(companyName);
      setEmail(email);
      setBio(bio);
      setPhoneNumber(phoneNumber);
      setProfilePicUrl(profilePicUrl?.URL);
      setFile(resume?.URL);
      setIsLoading(false);
      dispatch(SET_NAME(data.firstName));
      dispatch(SET_PHOTO(data.profilePicUrl.URL));
      dispatch(SET_COMPANY(data.companyName));
    }
    getUserData();
  }, [dispatch]);

  //edit button
  const handleEditClick = () => {
    setIsEditMode(true);
  };

  //save button
  const handleSaveClick = async (ev) => {
    ev.preventDefault();
    if (!firstName || !lastName)
      return toast.error("Please make sure all required fields aren't empty");

    if (role === "recruiter" && !companyName) {
      return toast.error("Company name can't be left empty");
    }

    if (phoneNumber && !/^\d{10}$/.test(phoneNumber))
      return toast.error("Please make sure the phone number format is correct");
    setIsLoading(true);
    dispatch(SET_NAME(firstName));
    const formData = {
      firstName,
      lastName,
      phoneNumber,
      bio,
      companyName,
    };
    await updateUserInfo(formData);
    toast.success("User info updated successfully");
    setIsLoading(false);
    setIsEditMode(false);
  };

  //cancel button
  const handleCancelClick = () => {
    setIsEditMode(false);
    window.location.reload();
  };

  //changes
  const handleFirstNameChange = (ev) => {
    setFirstName(ev.target.value);
  };
  const handleLastNameChange = (ev) => {
    setLastName(ev.target.value);
  };
  const handleCompanyNameChange = (ev) => {
    setCompanyName(ev.target.value);
  };
  const handlePhoneNumberChange = (ev) => {
    setPhoneNumber(ev.target.value);
  };
  const handleBioChange = (ev) => {
    setBio(ev.target.value);
  };

  const handleCurrentPasswordChange = (ev) => {
    setCurrentPassword(ev.target.value);
  };
  const handleNewPasswordChange = (ev) => {
    setNewPassword(ev.target.value);
  };

  const handleConfirmPasswordChange = (ev) => {
    setConfirmPassword(ev.target.value);
  };
  const handleChangePassword = async (ev) => {
    ev.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword)
      return toast.error("Please make sure all password fields are filled out");

    if (newPassword !== confirmPassword)
      return toast.error("New password do not match");

    if (newPassword.length < 8)
      return toast.error("Password must be at least 8 characters");

    setIsLoading(true);
    const dataForm = {
      currentPassword,
      newPassword,
    };

    const data = await changePassword(dataForm);
    setIsLoading(false);

    if (data?.message === "Password updated successfully") {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success(data.message);
    }
  };

  //delete user
  const handleClose = () => {
    setShow(false);
  };
  const handleClickDelete = (id) => {
    setShow(true);
  };

  //delete function
  const deleteAccount = () => {
    setIsLoading(true);
    dispatch(deleteUser);
    toast.success("Account deleted successfully");
    navigate("/register");
    dispatch(SET_LOGIN(false));
    setIsLoading(false);
    setShow(false);
  };

  //photo change
  const handlePhotoChange = (event) => {
    const photo = event.target.files[0];

    if (
      photo.type !== "image/png" &&
      photo.type !== "image/jpeg" &&
      photo.type !== "image/jpg"
    ) {
      return toast.error("File not supported");
    }
    if (photo.size > 2097152) return toast.error("File must be less than 2 MB");

    setProfilePicUrl(photo);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(photo);
  };

  const handleSubmitPhoto = async (event) => {
    event.preventDefault();

    // create a new FormData object to send the file
    const formData = new FormData();
    formData.append("image", profilePicUrl);

    // make a POST request to the backend to upload the image
    if (previewUrl) {
      setIsLoading(true);
      await uploadPhoto(formData);
      setIsLoading(false);
      window.location.reload();
    }
  };

  //download file
  const handleDownloadFile = async () => {
    document.getElementById("download-link").click();
  };

  //upload file

  const handleFileChange = (ev) => {
    const file = ev.target.files[0];
    if (file.type !== "application/pdf") {
      return toast.error("Only PDF format is supported");
    }
    if (file.size > 2097152) return toast.error("File must be less than 2 MB");

    setFile(file);
  };

  const handleFileSubmit = async (ev) => {
    ev.preventDefault();

    // create a new FormData object to send the file
    const formData = new FormData();
    formData.append("file", file);

    // make a POST request to the backend to upload the file
    setIsLoading(true);
    await uploadFile(formData);
    setIsLoading(false);
    window.location.reload();
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa" }}>
      <Navbar />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossOrigin="anonymous"
      />
      {isLoading && <Loader />}
      <div>
        <div className="container pt-5">
          <div className="main-body">
            <div className="row gutters-sm">
              <div className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="profile.jpg"
                          className="rounded-circle"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <img
                          src={profilePicUrl}
                          alt="profile.jpg"
                          className="rounded-circle"
                          width={150}
                        />
                      )}

                      <div className="mt-3">
                        <h4>{firstName + " " + lastName}</h4>
                        <p className="text-secondary mb-1">
                          {" "}
                          {isEditMode ? (
                            <input
                              type="text"
                              className="form-control"
                              name="bio"
                              value={bio}
                              placeholder="Add bio"
                              onChange={handleBioChange}
                            />
                          ) : (
                            <span>{bio}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmitPhoto}>
                  <label className="form-label mt-3" htmlFor="customFile">
                    Choose an image:
                  </label>

                  <div className="row">
                    <div className="col-sm-8">
                      <input
                        type="file"
                        className="form-control"
                        id="customFile"
                        onChange={handlePhotoChange}
                      />
                    </div>
                    <div className="col-sm-4">
                      <button type="submit" className="form-control">
                        Upload
                      </button>
                    </div>
                  </div>
                </form>

                <div className="card mt-3">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-globe mr-2 icon-inline"
                        >
                          <circle cx={12} cy={12} r={10} />
                          <line x1={2} y1={12} x2={22} y2={12} />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        <span style={{ marginLeft: "5px" }}>Website</span>
                      </h6>
                      <span className="text-secondary"></span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-github mr-2 icon-inline"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                        <span style={{ marginLeft: "5px" }}>Github</span>
                      </h6>
                      <span className="text-secondary"></span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-twitter mr-2 icon-inline text-info"
                        >
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                        </svg>
                        <span style={{ marginLeft: "5px" }}>Twitter</span>
                      </h6>
                      <span className="text-secondary"></span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-instagram mr-2 icon-inline text-danger"
                        >
                          <rect
                            x={2}
                            y={2}
                            width={20}
                            height={20}
                            rx={5}
                            ry={5}
                          />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                        <span style={{ marginLeft: "5px" }}>Instagram</span>
                      </h6>
                      <span className="text-secondary"></span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-facebook mr-2 icon-inline text-primary"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                        <span style={{ marginLeft: "5px" }}>Facebook</span>
                      </h6>
                      <span className="text-secondary"></span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  className="btn btn-danger btn-block mt-2"
                  onClick={() => handleClickDelete()}
                >
                  Delete Account
                </button>
                <DeleteModal
                  show={show}
                  handleClose={handleClose}
                  handleDeleteItem={deleteAccount}
                  message={
                    "All information will be deleted, are you sure you want to proceed?"
                  }
                />
              </div>
              <div className="col-md-8">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">First Name</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {isEditMode ? (
                          <input
                            type="text"
                            className={
                              "form-control" +
                              (firstName === "" ? " is-invalid" : "")
                            }
                            name="firstName"
                            value={firstName}
                            onChange={handleFirstNameChange}
                          />
                        ) : (
                          <span>{firstName}</span>
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Last Name</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {isEditMode ? (
                          <input
                            type="text"
                            className={
                              "form-control" +
                              (lastName === "" ? " is-invalid" : "")
                            }
                            name="lastName"
                            value={lastName}
                            onChange={handleLastNameChange}
                          />
                        ) : (
                          <span>{lastName}</span>
                        )}
                      </div>
                    </div>
                    <hr />
                    {role === "recruiter" && (
                      <>
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Company Name</h6>
                          </div>
                          <div className="col-sm-9 text-secondary text-capitalize">
                            {isEditMode ? (
                              <input
                                type="text"
                                className={
                                  "form-control" +
                                  (companyName === "" ? " is-invalid" : "")
                                }
                                name="companyName"
                                value={companyName}
                                onChange={handleCompanyNameChange}
                              />
                            ) : (
                              <span>{companyName}</span>
                            )}
                          </div>
                        </div>
                        <hr />
                      </>
                    )}
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {isEditMode ? (
                          <input
                            type="text"
                            className={"form-control"}
                            name="email"
                            value={email}
                            disabled
                          />
                        ) : (
                          <span>{email}</span>
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Phone</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {isEditMode ? (
                          <input
                            type="number"
                            min="0"
                            className="form-control"
                            name="phoneNumber"
                            value={phoneNumber || ""}
                            placeholder="Phone Number"
                            onChange={handlePhoneNumberChange}
                          />
                        ) : (
                          <span>
                            {phoneNumber ? phoneNumber : <>+1(XXX) XXX-XXXX</>}
                          </span>
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">User type</h6>
                      </div>
                      <div className="col-sm-9 text-secondary text-capitalize">
                        {isEditMode ? (
                          <input
                            type="text"
                            className={"form-control text-capitalize"}
                            name="role"
                            value={role}
                            disabled
                          />
                        ) : (
                          <span>{role}</span>
                        )}
                      </div>
                    </div>
                    <hr />
                    {isEditMode && role === "applicant" ? (
                      <>
                        <form onSubmit={handleFileSubmit} className="mb-2">
                          <label
                            className="form-label mt-3"
                            htmlFor="customFile"
                          >
                            Upload a resume:
                          </label>

                          <div className="row">
                            <div className="col-sm-8">
                              <input
                                type="file"
                                className="form-control"
                                id="customFile"
                                onChange={handleFileChange}
                              />
                            </div>
                            <div className="col-sm-4">
                              <button type="submit" className="form-control">
                                Upload
                              </button>
                            </div>
                          </div>
                        </form>
                        <hr />
                      </>
                    ) : (
                      file && (
                        <>
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Resume</h6>
                            </div>
                            <div className=" col-sm-3">
                              <button
                                type="button"
                                className="btn btn-outline-primary resumebtn"
                                onClick={handleDownloadFile}
                              >
                                View file
                              </button>
                              <Link
                                to={file}
                                id="download-link"
                                style={{ display: "none" }}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Download PDF
                              </Link>
                            </div>
                          </div>
                          <hr />
                        </>
                      )
                    )}
                    <div className="row">
                      <div className="col-sm-12 d-flex justify-content-between">
                        {isEditMode ? (
                          <>
                            <button
                              className="btn saveChanges"
                              onClick={handleSaveClick}
                            >
                              Save Changes
                            </button>
                            <button
                              className="btn btn-secondary"
                              style={{
                                width: "250px",
                              }}
                              onClick={() => handleCancelClick()}
                            >
                              Cancel Changes
                            </button>
                          </>
                        ) : (
                          <button
                            className="btn editProfile"
                            onClick={() => handleEditClick()}
                          >
                            Edit Profile
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <form
                  className="row gutters-md"
                  onSubmit={handleChangePassword}
                >
                  <div className="col-md-12">
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="row">
                          <div className="col">
                            <h6 className="mb-0 mt-2">Current Password</h6>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="password"
                              className="form-control"
                              name="currentPassword"
                              placeholder="**********"
                              value={currentPassword}
                              onChange={handleCurrentPasswordChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <h6 className="mb-0 mt-4">New Password</h6>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="password"
                              className="form-control"
                              name="newPassword"
                              placeholder="**********"
                              value={newPassword}
                              onChange={handleNewPasswordChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <h6 className="mb-0 mt-4">Confirm Password</h6>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="password"
                              className="form-control"
                              name="confirmPassword"
                              placeholder="**********"
                              value={confirmPassword}
                              onChange={handleConfirmPasswordChange}
                            />
                          </div>
                        </div>
                        <button className="btn mt-3 changePassword">
                          Change Password
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
