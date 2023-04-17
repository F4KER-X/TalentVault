import { Link } from "react-router-dom";
import notfound from "../assets/images/notfound.svg";
import Wrapper from "../assets/styling/WrapperErrorPage";

const ErrorPage = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={notfound} alt="404" />
        <h3>Oops! The page you're searching for cannot be found.</h3>
        <p>
          Looks like you've taken a wrong turn, let's get you{" "}
          <Link to="/">back home</Link> .
        </p>
      </div>
    </Wrapper>
  );
};
export default ErrorPage;
