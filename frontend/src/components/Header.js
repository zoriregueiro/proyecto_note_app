import "./css/header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";

export const Header = () => {
  const { isAuthenticated, logOut } = useAuth();

  return (
    <header>
      <h1>
        <Link to={"/"}>Note App</Link>
      </h1>
      <nav>
        {!isAuthenticated ? (
          <ul>
            <li>
              <Link to={"/register"}>Register</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to={"/my-notes"}>My Notes</Link>
            </li>
            <li>
              <button onClick={logOut}>Log Out</button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};
