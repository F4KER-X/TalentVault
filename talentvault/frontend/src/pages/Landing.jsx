import main from "../assets/images/main.svg";
import Logo from "../components/Logo";
import Wrapper from "../assets/styling/LandingPage";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Career <span>Service</span> Application
          </h1>
          <p>
            Streamline your job search with a powerful application that
            simplifies the process for recruiters and applicants. With secure
            REST API protection and persistent login sessions, TalentVault's
            user-friendly interface makes it easy to create, delete, or update
            job listings, review applications, view resumes, and more.
          </p>
          <div className="btns-main">
            <Link to="/Register" className="btn1 btn-hero">
              Login/Register
            </Link>
            <Link className="btn1 btn-hero">Post a job</Link>
          </div>
          {/* <button className="btn btn-hero">Login/Register</button> */}
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
