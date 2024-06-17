import { createContext } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children, username, password }) => {
  // Login metod
  // call with ' logIn("username", "password") '
  const logIn = async (username, password) => {
    const loginData = {
      username: `${username}`,
      password: `${password}`,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(loginData),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signin`,
        options
      );
      if (response.ok) {
        console.log(`Logged in as ${username}`);
      }
      const fetchData = await response.json();
      localStorage.setItem("loggedInUserId", fetchData.id);
      // Console output for debugging
      console.log(response.status);
      console.log(fetchData.id);  
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  

  return (
    <LoginContext.Provider
      value={{ logIn, username, password }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
