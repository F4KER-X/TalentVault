import logo from "../assets/images/logo.svg";

const Logo = () => {
  return (
    <img
      src={logo}
      onClick={() => {
        window.location.href = "/";
      }}
      alt="TalentVault"
      className="logo"
    />
  );
};

export default Logo;
