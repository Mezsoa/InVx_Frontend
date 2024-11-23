import { Link } from "react-router-dom";
import "./Footer.css";
import { AuthContext } from "../context/AuthContext";
import { useState, useContext } from "react";

const Footer = () => {
  const { logout } = useContext(AuthContext);

  const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && Array.isArray(user.role) && user.role.length > 0) {
      return user.role[0];
    }
    return null;
  };

  const userRole = getUserRole();

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  function checkLogin() {
    if (localStorage.getItem("loggedInUserId") === null) {
      return null;
    } else if (userRole === "ROLE_ADMIN") {
      return (
        <div className="footer-desktop">
          <Link to="/todo">Todo</Link>
          <Link to="/profile">Profile</Link>
          {/* <Link to="/feedback">Feedback</Link> */}
          <Link className="logout" to="/login" onClick={handleLogout}>
            Sign out
          </Link>
        </div>
      );
    }
    else {
      return (
        <div className="footer-desktop">
          <Link to="/todo">Todo</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/feedback">Feedback</Link>
          <Link className="logout" to="/login" onClick={handleLogout}>
            Sign out
          </Link>
        </div>
      );
    }
  }

  return (
    <>
      <footer className="footer">{checkLogin()}</footer>
    </>
  );
};

export default Footer;
