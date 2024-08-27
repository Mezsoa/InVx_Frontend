import "../SignupBody/signupbody.css";
import { useContext, useEffect, useState } from "react";
import { SignupContext, SignupProvider } from "../context/SignupContext";
import { Link } from "react-router-dom";
import invx from "/assets/invx.png";
const signupbody = () => {
  const { fetchSignup } = useContext(SignupContext);

  const [signupValue, setSignupValue] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    dateOfBirth: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSignupValue({ ...signupValue, [name]: value });
  };

  const handleSubmit = async (e, signupValue) => {
    e.preventDefault();

    // SETTING UP THE REQUEST OPTIONS
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(signupValue),
    };
    // SENDING A REQUEST TO THE BACKEND API

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/sign/up`,
        options
      );

      if (res.status === 200) {
        console.log("regristrering ok");
        // Storing popupmessage, Getting it onece the user is redirected to login.
        localStorage.setItem(
          "popupmessage",
          "Lyckad Registrering!\nVänligen logga in"
        );
        // Here i want to redirect the created user
        window.location.href = "/login";
      } else {
        alert("Färsäk igen");
      }
    } catch (err) {
      alert("Ett oväntat fel har inträffat");
    }
  };

  return (
    <>
      <div className="signup-body">
        <Link to={"/login"} className="">
          <img src={invx} className="signup-logo-logo" />
        </Link>
        <div className="signup-container">
          <form className="signup-form">

            <input
              name="username"
              value={signupValue.username}
              type="text"
              id="username"
              className="signup-username"
              placeholder="Username"
              onChange={handleChange}
            />

            <input
              name="password"
              value={signupValue.password}
              type="password"
              id="password"
              className="signup-password"
              placeholder="Password"
              onChange={handleChange}
            />

            <input
              name="firstName"
              value={signupValue.firstName}
              type="text"
              id="fname"
              className="signup-fname"
              placeholder="First Name"
              onChange={handleChange}
            />

            <input
              name="lastName"
              value={signupValue.lastName}
              type="text"
              id="lname"
              className="signup-lname"
              placeholder="Last Name"
              onChange={handleChange}
            />

            <input
              name="email"
              value={signupValue.email}
              type="email"
              id="email"
              className="signup-email"
              placeholder="Email"
              onChange={handleChange}
            />

            <input
              name="dateOfBirth"
              value={signupValue.dateOfBirth}
              type="date"
              id="dob"
              className="signup-dob"
              placeholder="Date of Birth"
              onChange={handleChange}
            />

            <button
              id="signUpButton"
              onClick={(e) => handleSubmit(e, signupValue)}
              className="signup-button"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default signupbody;
