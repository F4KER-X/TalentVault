import styled from "styled-components";

const Wrapper = styled.section`
  * {
    user-select: none;
  }
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    overflow: none;
    max-width: 800px;
    border-top: 5px solid var(--primary-500);
  }

  .job-status {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 0.25rem;
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
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .container {
    display: flex;
    flex-direction: column;
  }

  .couple {
    padding: 5px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    border-top: 1px solid #c0c0c0;
  }
  h4 {
    font-weight: bold;
    margin-top: 2rem;
  }
  .couple h5 {
    font-weight: bold;
    margin-bottom: 5px;
  }
  .couple p {
    text-align: none;
    margin-top: 0;
  }
  ul {
    padding-left: 20px;
    list-style: disc;
    margin-left: 1rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  .title {
    margin-top: 5px;
    font-size: 12px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
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
    margin-top: 6px;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: left;
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
    margin-bottom: 20px;
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
