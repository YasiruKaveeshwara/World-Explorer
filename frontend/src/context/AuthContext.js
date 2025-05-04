// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
