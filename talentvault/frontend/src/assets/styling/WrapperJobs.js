import styled from "styled-components";

const Wrapper = styled.section`
  * {
    user-select: none;
    overflow: none;
  }
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    margin: auto;
    max-width: 55vw;
    border-top: 5px solid var(--primary-500);
  }
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .form-control {
    width: 95%;
    border-radius: 5px;
    border-width: 1px;
    font-family: Roboto;
    font-size: 15px;
    margin: 2px 0;
  }
  .title {
    margin-top: 0px;
    font-size: 17px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    color: #4540db;
    padding-left: 5px;
  }
  .desc {
    display: flex;
    flex-direction: row;
    font-size: 15px;
  }
  .buttons-2 {
    display: flex;
    flex-direction: row;
    margin: 1rem auto;
  }
  .job-status {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 0.25rem;
    margin-top: 2px
  }
  .job-status.open {
    color: green;
    background-color: #dff0d8;
    border-color: #d6e9c6;
  }
  .job-status.closed {
    color: red;
    background-color: #f2dede;
    border-color: #ebccd1;
  }
  .edit {
    margin-top: 6px;
    cursor: pointer;
    margin-left: auto;
  }
  .delete {
    margin-top: 6px;
    margin-left: 6px;
    cursor: pointer;
  }
  h3 {
    text-align: center;
  }
  .apply {
    margin-top: 6px;
  }
  .info {
    margin-left: 6px;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-right: 1rem;
    padding: auto;
    margin-top: 1rem;
  }
  .address {
    margin-bottom: 20px;
  }
  .form-title {
    margin-bottom: 5px;
  }
  .btn-success {
    margin-right: 1rem;
    padding: auto;
    margin-top: 1rem;
    background: #0f5132;
    cursor: pointer;
    color: var(--white);
    border: transparent;
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
    padding: 0.375rem 0.75rem;
    box-shadow: var(--shadow-2);
    transition: var(--transition);
    text-transform: capitalize;
    display: inline-block;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;
export default Wrapper;