
import { Link } from "react-router-dom";
import "./Footer.css";
import { AuthContext } from "../context/AuthContext";
import { useState, useContext } from "react";


const Footer = () => {

  const {logout} = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  }

  function checkLogin() {
    if (localStorage.getItem("loggedInUserId") === null) {
      return (
        <div className="footer-desktop">
          <Link to="/consistency">Consistency</Link>
          <Link to="/feedback">Feedback</Link>
          {/* <Link to="/todo">Todo</Link> */}
          <Link to="/login">Sign In</Link>
          <Link to="/signup">Register</Link>
        </div>
      );
    } else {
      return (
        <div className="footer-desktop">
          <Link to="/consistency">Consistency</Link>
          <Link to="/feedback">Feedback</Link>
          {/* <Link to="/todo">Todo</Link> */}
          {/* <Link to="/profile">Profile</Link> */}
          <Link className="logout" to="/login" onClick={handleLogout}>Sign out</Link>
        </div>
      );
    }
  }

  return (
    <footer className="footer">
      <div className="under">
        <Link to="/todo">Todo</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/consistency">Consistency</Link>
        <Link to="/feedback">Feedback</Link>
      </div>
      <div className="over">
        {/*<a href="#">Sign In / Register</a>*/}
      </div>
      <>
      {checkLogin()}
      </>
    </footer>
  );
};

export default Footer;