import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCompany,
  selectID,
  selectName,
  selectPhoto,
  selectRole,
  SET_LOGIN,
} from "../redux/features/auth/authSlice";
import { logoutUser, uploadPhoto } from "../redux/features/auth/authService";
import { Link, useNavigate } from "react-router-dom";
import { ShowOnLogin } from "../components/protect/hiddenLinks";
import UserRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";
import "./test.css";
import Navbar from "../components/Navbar";

export default function Test() {
  UserRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstName = useSelector(selectName);
  const photo = useSelector(selectPhoto);
  const role = useSelector(selectRole);
  const company = useSelector(selectCompany);
  const id = useSelector(selectID);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file.type !== "image/png") {
      return console.log("not image");
    }
    setFile(file);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // create a new FormData object to send the file
    const formData = new FormData();
    formData.append("image", file);

    // make a POST request to the backend to upload the image

    const data = await uploadPhoto(formData);

    //console.log(data);
    console.log(file);
  };

  return (
    <div>
      <Navbar />

      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Choose an image:
            <input type="file" onChange={handleFileChange} />
          </label>
          <button type="submit">Upload</button>
        </form>
        {previewUrl && (
          <img src={previewUrl} alt="Preview" style={{ maxWidth: "100%" }} />
        )}
      </div>
    </div>
  );
}
