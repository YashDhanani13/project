import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Authcontext/context";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
