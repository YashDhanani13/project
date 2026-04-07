import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. Initialize state from LocalStorage so refresh doesn't log you out
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); // Save for the Interceptor to find
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Clear it so Interceptor sends nothing
    window.location.href = '/login';
  };
  

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};