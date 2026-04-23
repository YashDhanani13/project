import React, { createContext, useState } from "react";
// import {useNavigate} from 'react-router-dom';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken); // Save for the Interceptor to find
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token"); //   Interceptor sends nothing
    // window.location.href = "/login";
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
