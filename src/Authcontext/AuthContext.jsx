import React, { createContext, useState } from "react";
// import {useNavigate} from 'react-router-dom';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const navigate = useNaviga/te();

  const [token, setToken] = useState();

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken); // Save for the Interceptor to find
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token"); //   Interceptor sends nothing
    window.location.href = "/login";
    // navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// // 
// import api, { setClientToken } from "../api/api"; // Import both

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);

//   const login = (newToken) => {
//     setToken(newToken);
//     setClientToken(newToken); // Pushes the token into the api.js memory!
//   };

//   const logout = () => {
//     setToken(null);
//     setClientToken(null); // Clears it from api.js
//     window.location.href = "/login";
//   };

//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };