import { Link } from "react-router-dom";
import "./Footer.css";
import { AuthContext } from "../context/AuthContext";
import { useState, useContext } from "react";

const Footer = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  function checkLogin() {
    if (localStorage.getItem("loggedInUserId") === null) {
      return null;
    } else {
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
