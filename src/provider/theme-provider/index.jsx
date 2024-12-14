import React, { createContext, useContext, useState } from "react";

// Create the context with a default object structure
const DarkModeContext = createContext(null);

// Provider component
export const DarkModeProvider = ({ children }) => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(
    localStorage.getItem("is_dark_mode_enabled") === "true"
  );

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkModeEnabled;
    localStorage.setItem("is_dark_mode_enabled", String(newDarkModeState));
    setIsDarkModeEnabled(newDarkModeState);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkModeEnabled, toggleDarkMode, setIsDarkModeEnabled }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Hook to use the context
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
