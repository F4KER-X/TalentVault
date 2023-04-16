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

  .statusSpan{
  margin-right: 15px;
  }
  .statusDiv{
    margin-top:15px;
  }

  .workTypediv{
    margin-top: 15px;
  }
  .jobTypediv{
    margin-top: 15px;
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

  .salary-d {
    padding: 10px 0;
  }
  
  .salary-d label {
    font-family: Roboto;
    padding-right: 10px;
  }
  
  .salary-d input {
    background-color: #e2ebf4;
    border: 1px solid var(--grey-200);
    border-radius: 4px;
    padding: 0.375rem 0.75rem;
    height: 35px;
  }
  .jobdescriptiondiv {
    padding: 25px 0 100px 0;
  }
  .jobdescriptionbox {
    background-color: #e2ebf4;
    height: 300px;
  }

  .jobreqinput {
    line-height: 2;
    padding: 10px;
    resize: none;
    
  }

  .couple {
    padding: 5px;
    padding-top: 10px;
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
    font-size: 0.9rem;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
  }
  .is-invalid{
    border: 1px solid red !important;
  }
  .desc {
    display: flex;
    flex-direction: row;
    font-size: 15px;
  }

.form-input-location{
  width: 25%;
  padding: 0.375rem 0.75rem;
  border-radius: var(--borderRadius);
  background: #e2ebf4;
  border: 1px solid var(--grey-200);
  height: 30px;
  margin-left: 5px
}


  .buttons-2 {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    max-width: 800px;
    margin-bottom: 25px;
  }
  .buttons-1 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    max-width: 800px;
    margin-bottom: 25px;
    padding: 0;
    margin-right: 500px
  }


  .edit {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: -5px;
    cursor: pointer;
  }
  .delete {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 0px;
    cursor: pointer;
  }
  .remotelabel{
    margin-left: 5px;
  }
  .Employment-Type{
    margin-left: 5px;
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
    width: 100%;
  }

  .jobDescriptionPara p{
    width: 100% !important;
    max-width: 100% !important;
  }
  .floater {
    float: left;
    width: 50%;
  }
  .location-div {
    padding-bottom: 40px;
    padding-top: 15px;
  }
  .location-div label {
    font-family: Roboto;
    padding-right: 10px;
  }

  .location-div input {
    background-color: #e2ebf4;
    border: 1px solid var(--grey-200);
    border-radius: 4px;
    padding: 0.375rem 0.75rem;
    height: 35px;
  }
  .btn {
    width: 125px;
    max-width: 150px;
    margin-left: 25px;
    text-align: center;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 1rem
  }
  .btn-2 {
    width: 125px;
    max-width: 150px;
    text-align: center;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 1rem 
  }

  .locationIcon{
    margin-right: 7px;
  }
  .address {
    margin-bottom: 20px;
    margin-right: 20px;
  }

  .form-title {
    margin-bottom: 20px;
    margin-top: 2rem;
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
