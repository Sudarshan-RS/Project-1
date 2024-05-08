import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";

export const Navbar = () => {

  // Custom hook to check if the user is logged in
  const {isLoggedIn} = useAuth();

  return (
    <>
      <header>
        <div className="container">
          {/* Logo and brand link */}
          <div className="logo-brand">
            <NavLink to="/">ThapaTechnical</NavLink>
          </div>

          {/* Navigation menu */}
          <nav>
            <ul>
              {/* Navigation links */}
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/service">Services</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>

              {/* Conditional rendering based on user authentication status */}
              {isLoggedIn ? (
                <li>
                  <NavLink to="/logout">Logout</NavLink>
                </li>
              ) : ( 
                 <>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
               </> 
               )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
