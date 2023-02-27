import Wrapper from "../assets/styling/InputFIeld";

const FormRow = ({ type, name, value, onChange, labelText }) => {
  return (
    <Wrapper>
      <div className="form-row">
        <label className="form-label">{labelText || name}</label>
        <input
          type={type}
          className="form-input"
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </Wrapper>
  );
};
export default FormRow;
