import styled from "styled-components";

const Wrapper = styled.div`
  * {
    user-select: none;
  }
  .logo {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0.5rem;
    margin-right: auto;

    align-items: left;
    justify-content: left;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  .logout {
    background: transparent;
    border: transparent;
    color: #842029;
    font-size: 16px;
    max-width: 100px;
    margin-left: 4px;
    transition: var(--speed);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
  .logout:hover {
    color: #f8d7da;
  }
  .menu-trigger img {
    margin: 0.5rem;
    position: absolute;
    top: 30px;
    right: 20px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    background-color: #fff;
  }

  .search {
    margin-right: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
  }

  .search__input {
    font-family: inherit;
    font-size: inherit;
    background-color: #fff;
    border: none;
    color: #646464;
    padding: 0.7rem 1rem;
    border-radius: 30px;
    width: 12em;
    transition: all ease-in-out 0.5s;
    margin-right: -2rem;
  }

  .search__input:hover,
  .search__input:focus {
    box-shadow: 0 0 1em #00000013;
  }

  .search__input:focus {
    outline: none;
    background-color: #fff;
  }

  .search__input::-webkit-input-placeholder {
    font-weight: 100;
    color: #ccc;
  }

  .search__input:focus + .search__button {
    background-color: #fff;
  }

  .search__button {
    border: none;
    background-color: #fff;
    margin-top: 0.1em;
  }
  .burger {
    display: none;
    flex-direction: row;
    justify-content: flex-start;
    align-items: left;
    margin: 0.5rem;
  }
  .search__button:hover {
    cursor: pointer;
  }

  .search__icon {
    height: 1.3em;
    width: 1.3em;
    fill: #b4b4b4;
  }
  .dropdown-menu {
    position: absolute;
    top: 115px;
    right: 25px;
    background-color: #fff;
    border-radius: var(--border-radius);
    padding: 10px 20px;
    width: 200px;
  }

  .dropdown-menu::before {
    content: "";
    position: absolute;
    top: -5px;
    right: 20px;
    height: 20px;
    width: 20px;
    background: var(--secondary-bg);
    transform: rotate(45deg);
  }

  .dropdown-menu.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition: var(--speed) ease;
  }

  .dropdown-menu.inactive {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: var(--speed) ease;
  }

  h3 {
    width: 100%;
    text-align: center;
    font-size: 18px;
    padding: 20px 0;
    font-weight: 500;
    font-size: 18px;
    color: var(--primary-text-color);
    line-height: 1.2rem;
  }

  h3 span {
    font-size: 14px;
    color: var(--secondary-text-color);
    font-weight: 400;
  }

  .dropdown-menu ul li {
    padding: 10px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }

  .dropdown-menu ul li:hover a {
    color: rgb(212, 33, 9);
    cursor: pointer;
  }

  .dropdown-menu ul li:hover img {
    opacity: 1;
    cursor: pointer;
  }

  .dropdownItem {
    display: flex;
    margin: 10px auto;
  }

  .dropdownItem img {
    max-width: 20px;
    margin-right: 10px;
    opacity: 0.5;
    transition: var(--speed);
  }
  .navbar {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    background-color: #f2f2f2;
    padding: 10px;
  }

  .dropdownItem a {
    max-width: 100px;
    margin-left: 10px;
    transition: var(--speed);
  }

  .btn-1 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    background-color: #10b981;

    border-radius: 0.5rem;
  }
  .name {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 600;
  }
  .user {
    background: transparent;
    border-color: transparent;
  }
  .btn {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .gap-2 {
    display: flex;
    position: relative;
    margin-right: 3rem;
    align-items: center;
    gap: 0.5rem;
  }

  .search-input {
    padding: 0.5rem;
    padding-left: 2.5rem;
    border-radius: 1.5rem;
  }

  .search {
    position: relative;
    margin-left: 25px;
    margin-right: auto;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .dropdown-btn {
    color: var(--primary-500);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
  }
  .first-part {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .navbar-profile {
    background: transparent;
    border-color: transparent;

    display: flex;
    align-items: center;

    color: #4540db;
    padding: 8px 16px;
    border-radius: 4px;
    margin-left: auto;
    font-weight: 500;
    cursor: pointer;
  }

  /* @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  } */
`;
export default Wrapper;
