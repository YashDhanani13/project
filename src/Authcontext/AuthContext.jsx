import React, { createContext, useState } from "react";
import socket, { refreshSocketAuth } from "../socket";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const login = (newToken) => {
    setToken(newToken);
    
    localStorage.setItem("token", newToken); // Save for the Interceptor to find
    refreshSocketAuth();
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token"); //   Interceptor sends nothing
    socket.disconnect();
    window.location.href = "/login";
  
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
