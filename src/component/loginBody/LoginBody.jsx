import "../loginBody/LoginBody.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const LoginBody = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || (!password && password != data)) {
      alert("Fill in Username and password");
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/sign/in`,
        {
          username,
          password,
        },
        {
          withCredentials: true, //showing the cookie
        }
      );

      dispatch({
        type: "LOGIN",
        payload: data,
      });

      window.localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("loggedInUserId", data.id);
      console.log("user Login: " + username);
      console.log("userId: " + data.id);

      // readirect user to home

      await navigate("/todo");
      window.location.reload();
    } catch (err) {
      console.log("Error: +" + err);
      alert("Lösenordet du har angivit är felaktigt");
    }
  };

  return (
    <div className="LoginContainer">
      <form className="loginForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a className="fg" href="index.html">
          Forgot password{" "}
        </a>

        <a className="ca" href="/signup">
          Create account
        </a>
        
        <button type="submit" className="button">
          Sign In
        </button>

        
      </form>
    </div>
  );
};

export default LoginBody;
