import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


  const [token, setToken] = useState();

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken); // Save for the Interceptor to find
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token"); //   Interceptor sends nothing
    window.location.href = "/login";
  
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};