import Wrapper from "../assets/styling/JobsExtended";
import InputField from "./InputField";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaBriefcase,
  FaBuilding,
  FaRegBuilding,
  FaExternalLinkAlt,
  FaRegEdit,
  FaCheck,
} from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FiInfo } from "react-icons/fi";
import { useEffect } from "react";
import {
  selectID,
  selectIsLoggedIn,
  selectRole,
} from "../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { createNewApplication } from "../redux/features/application/applicationSlice";

const JobsExtended = () => {

  const dispatch = useDispatch();
  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectID);

  const { applications, isError, message } = useSelector(
    (state) => state.application
  );


  const applyApplication = async (ev) => {
    ev.preventDefault()
    const formData = {
      jobId: id
    }
    await dispatch(createNewApplication(formData));
  }


  return (
    <>
      {/* To be implemented, the edit form */}
      <Wrapper>
        <div className="form">
          <div className="top">
            <h4 className="form-title">Insert Job Title Here</h4>
            <FaRegEdit className="edit" size={20} />
            <AiOutlineDelete className="delete" size={20} />
          </div>

          <h6 className="title">Insert company * City, Province </h6>
          <h6 className="title address">Insert City, Province</h6>
          <div>
            <div className="form-control">
              <FaRegBuilding /> Remote
            </div>

            <div className="form-control">
              <FaBriefcase /> Full time
            </div>
            <div>

            </div>

            <div className="buttons-2">
              {/* <div href="" className="btn">
                Apply <FaExternalLinkAlt className="apply" size={15} />
              </div> */}
              <button onClick={applyApplication}></button>

              <div href="" className="btn-success">
                Applied <FaCheck className="info" size={15} />
              </div>
            </div>
          </div>
          <div className="description">
            <h4>Job Details</h4>

            <div className="`container">
              <div className="couple">
                <h5>Job Type</h5>
                <InputField />
              </div>

              <div className="couple">
                <h5>postion</h5>
                <p>software engineer</p>
              </div>
              <div className="couple">
                <h5>Salary</h5>
                <p>
                  Between $<span>25000</span> and $<span>30000</span>
                </p>
              </div>
              <div className="couple">
                <h5>Requirements</h5>


              </div>
              <div className="couple">
                <h5>Description</h5>
                <p>
                  We are seeking a skilled React developer to join our team. You
                  will be responsible for developing and maintaining web
                  applications using React, Redux, and related technologies. The
                  ideal candidate will have experience with responsive design,
                  cross-browser compatibility, and testing frameworks such as
                  Jest or Enzyme.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>

      {/* below is the normal form */}

      <Wrapper>
        <div className="form">
          <div className="top">
            <h4 className="form-title">Insert Job Title Here</h4>
            <FaRegEdit className="edit" size={20} />
            <AiOutlineDelete className="delete" size={20} />
          </div>

          <h6 className="title">Insert company * City, Province </h6>
          <h6 className="title address">Insert City, Province</h6>
          <div>
            <div className="form-control">
              <FaRegBuilding /> Remote
            </div>

            <div className="form-control">
              <FaBriefcase /> Full time
            </div>
            <div>

            </div>

            <div className="buttons-2">
              <div href="" className="btn">
                Apply <FaExternalLinkAlt className="apply" size={15} />
              </div>

              <div href="" className="btn-success">
                Applied <FaCheck className="info" size={15} />
              </div>
            </div>
          </div>
          <div className="description">
            <h4>Job Details</h4>

            <div className="`container">
              <div className="couple">
                <h5>Job Type</h5>
                <p>Part-time</p>
              </div>

              <div className="couple">
                <h5>postion</h5>
                <p>software engineer</p>
              </div>
              <div className="couple">
                <h5>Salary</h5>
                <p>
                  Between $<span>25000</span> and $<span>30000</span>
                </p>
              </div>
              <div className="couple">
                <h5>Requirements</h5>


              </div>
              <div className="couple">
                <h5>Description</h5>
                <p>
                  We are seeking a skilled React developer to join our team. You
                  will be responsible for developing and maintaining web
                  applications using React, Redux, and related technologies. The
                  ideal candidate will have experience with responsive design,
                  cross-browser compatibility, and testing frameworks such as
                  Jest or Enzyme.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
export default JobsExtended;
