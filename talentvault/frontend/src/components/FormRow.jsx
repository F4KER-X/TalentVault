const FormRow = ({ type, name, value, onChange, labelText }) => {
  return (
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
  );
};
export default FormRow;
