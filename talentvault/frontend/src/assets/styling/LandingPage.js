import styled from "styled-components";

const Wrapper = styled.main`
  * {
    user-select: none;
  }

  nav {
    width: var(--fluid-width);
    max-width: var(--max-wdith);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  btns-main {
    display: flex;
    justify-content: center;
  }
  .btn1 {
    background-color: #4540db;
    color: white;
    width: 1ref;
    margin-right: 15px;
    border-radius: 10px;
    padding: 10px;
    border: none;
  }

  @media (max-width: 768px) {
    .btns-main {
      flex-direction: column;
      align-items: center;
    }
  }

  .page {
    min-height: calc(1100vh- var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: 3rem;
  }
  h1 {
    margin-top: 5rem;
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Wrapper;
