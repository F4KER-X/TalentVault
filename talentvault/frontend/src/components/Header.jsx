import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Header() {
  // const { user, SetUser } = useContext(UserContext);

  // function logout() {}

  // return (
  //   <header>
  //     <Link to="/" className="logo">
  //       MyBlog
  //     </Link>
  //     <nav>
  //       {username && (
  //         <>
  //           <Link to="/create">Create new post</Link>
  //           <a onClick={logout}>Logout ({username})</a>
  //         </>
  //       )}
  //       {!username && (
  //         <>
  //           <Link to="/login">Login</Link>
  //           <Link to="/register">Register</Link>
  //         </>
  //       )}
  //     </nav>
  //   </header>
  // );
  return <></>;
}
