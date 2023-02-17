import styled from "styled-components";

const Wrapper = styled.main`
  * {
    user-select: none;
  }

  text-align: center;
  img {
    max-width: 800px;
    display: block;
    margin-right: 5rem;

    margin-bottom: 2rem;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    margin: auto;
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--grey-500);
  }
  a {
    color: var(--primary-500);
    text-decoration: underline;
    text-transform: capitalize;
  }

  /* ADD a media query for small devices to be responsive similar to p */
`;

export default Wrapper;
