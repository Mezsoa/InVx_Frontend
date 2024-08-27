import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // Check if there's a saved theme preference in localStorage
    const savedTheme = localStorage.getItem("isDarkTheme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
     
    }
    // Save theme preference to localStorage
    localStorage.setItem("isDarkTheme", JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
