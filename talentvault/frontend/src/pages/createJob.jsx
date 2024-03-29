import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import JobForm from "../components/Job/JobForm";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { selectCompany, selectID } from "../redux/features/auth/authSlice";
import { addJob, selectIsLoading } from "../redux/features/job/jobSlice";
import "../index.css";
import Footer from "../components/Footer";
import UseRedirectNotAuthorizedRole from "../hook/useRedirectNotAuthorizedRole";

const initialState = {
  recruiterId: "",
  jobTitle: "",
  companyName: "",
  maxSalary: "",
  minSalary: "",
  jobType: "",
  jobRequirements: "",
  city: "",
  province: "",
  workType: "",
};

const CreateJob = () => {
  UseRedirectNotAuthorizedRole("/dashboard", "recruiter");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = useSelector(selectID);
  const company = useSelector(selectCompany);

  const [job, setJob] = useState(initialState);
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState(false);
  const [salaryError, setSalaryError] = useState(false);

  const isLoading = useSelector(selectIsLoading);

  const {
    jobTitle,
    maxSalary,
    minSalary,
    jobType,
    jobRequirements,
    city,
    province,
    workType,
  } = job;

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    setJob({
      ...job,
      [name]: value,
    });
  };

  const saveJob = async (ev) => {
    ev.preventDefault();
    const formData = {
      recruiterId: id,
      jobTitle,
      companyName: company,
      maxSalary: parseInt(maxSalary),
      minSalary: parseInt(minSalary),
      jobDescription,
      jobType: jobType || "Full-time",
      jobRequirements,
      jobLocation: {
        city,
        province,
      },

      workType: workType || "Remote",
    };

    if (
      !formData.jobTitle ||
      !formData.recruiterId ||
      !formData.companyName ||
      !formData.maxSalary ||
      !formData.minSalary ||
      !formData.jobDescription ||
      !formData.jobLocation.city ||
      !formData.jobLocation.province ||
      !formData.workType ||
      !formData.jobRequirements
    ) {
      setError(true);
      return toast.error("All fields are required");
    }
    if (formData.maxSalary < 0 || formData.minSalary < 0) {
      setSalaryError(true);
      return toast.error("Negative salaries are not allowed");
    }
    if (formData.maxSalary <= formData.minSalary) {
      setSalaryError(true);
      return toast.error(
        "Max salary can not be less or equals to Min salary!!"
      );
    }
    setError(false);
    setSalaryError(false);
    dispatch(addJob(formData));

    navigate("/dashboard");
  };
  return (
    <>
      <div>
        {isLoading && <Loader />}
        <Navbar />

        <h3 style={{ textAlign: "center", marginTop: "20px" }}>
          Create your Job
        </h3>
        <JobForm
          job={job}
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          handleInputChange={handleInputChange}
          saveJob={saveJob}
          error={error}
          salaryError={salaryError}
        />
      </div>
      <Footer />
    </>
  );
};
export default CreateJob;
