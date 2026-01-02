import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [username, setUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    token ? localStorage.setItem("token", token) : localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    role ? localStorage.setItem("role", role) : localStorage.removeItem("role");
  }, [role]);

  useEffect(() => {
    username ? localStorage.setItem("username", username) : localStorage.removeItem("username");
  }, [username]);

  const login = ({ token, role, username }) => {
    setToken(token);
    setRole(role);
    setUsername(username);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUsername(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, role, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
