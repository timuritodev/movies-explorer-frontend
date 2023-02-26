import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children }) => {

  let location = useLocation();

  if (!loggedIn && (location.pathname === "/signin" || location.pathname === "/signup")) {
    return <Navigate to="/movies" replace />;
  }

  if (!loggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
