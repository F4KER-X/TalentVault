import logo from "../assets/images/logo_no_text.svg";

const Logo_no_text = () => {
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

export default Logo_no_text;
