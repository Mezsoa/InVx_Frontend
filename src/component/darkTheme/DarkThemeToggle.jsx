import { useContext, useEffect, useState } from "react";
import "../darkTheme/DarkThemeToggle.css";
import ThemeContext from "../context/ThemeContext.jsx";

const DarkThemeToggle = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext)

  

  return (
    <div className="settings-settings">
      <span>Dark Theme</span>
      <label className="switch">
        <input type="checkbox" checked={isDarkTheme || false} onChange={toggleTheme} />
        <span className="slider"></span>
      </label>
    </div>
  );
};
export default DarkThemeToggle;
