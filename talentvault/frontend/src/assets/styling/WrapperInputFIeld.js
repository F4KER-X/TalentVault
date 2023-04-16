import styled from "styled-components";

const Wrapper = styled.section`
  .form-label {
    display: block;
    font-size: var(--smallText);
    margin-bottom: 0.5rem;
    letter-spacing: var(--letterSpacing);
  }

  .form-input,
  .form-textarea,
  .form-select {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border-radius: var(--borderRadius);
    background: #e2ebf4;
    border: 1px solid var(--grey-200);
    font-size: var(--smallText);
    color: var(--grey-800);
    margin-top: 0.5rem;
    box-sizing: border-box;

    &:focus {
      outline: none;
      box-shadow: 0px 0px 2px var(--blue-400);
    }
  }

  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }

  .form-row {
    margin-bottom: 1rem;
  }

  .form-textarea {
    height: 7rem;
    resize: none;
  }

  ::placeholder {
    font-family: inherit;
    color: var(--grey-400);
  }

  .form-alert {
    color: var(--red-dark);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
  }
  /* alert */
`;
export default Wrapper;
