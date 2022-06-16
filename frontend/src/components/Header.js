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
          <ul className="header-links-logout">
            <li>
              <Link to={"/register"}>Register</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </ul>
        ) : (
          <ul className="header-links-login">
            <li>
              <Link className="my-notes-link" to={"/my-notes"}>
                My Notes
              </Link>
            </li>
            <li>
              <button className="log-out-button" onClick={logOut}>
                Log Out
              </button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};
