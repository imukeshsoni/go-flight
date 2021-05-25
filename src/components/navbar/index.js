import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const clickHandler = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const handleLogOut = (e) => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <i className="fas fa-plane-departure"></i>GO-Flights
          </Link>
          <div className="menu-icon" onClick={clickHandler}>
            <i className={click ? "fas fa-times " : "fas fa-bars"} />
          </div>
          {user ? (
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-links">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-links"
                  onClick={(e) => handleLogOut(e)}
                >
                  Log Out
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-links">
                  {user.name}
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-links">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/login" className="nav-links">
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};
export default Navbar;
