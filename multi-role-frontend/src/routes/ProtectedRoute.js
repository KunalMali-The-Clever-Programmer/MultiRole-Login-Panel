// import React, { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const ProtectedRoute = ({ children, requiredRole }) => {
//   const { token, role } = useContext(AuthContext);

//   if (!token) return <Navigate to="/login" />;

//   // if requiredRole provided and doesn't match -> redirect to home role dashboard
//   if (requiredRole && role !== requiredRole) {
//     if (role === "ADMIN") return <Navigate to="/admin" />;
//     if (role === "MANAGER") return <Navigate to="/manager" />;
//     if (role === "USER") return <Navigate to="/user" />;
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default ProtectedRoute;
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ requiredRole }) => {
  const { token, role } = useContext(AuthContext);

  // Not logged in
  if (!token) return <Navigate to="/login" replace />;

  // Logged in but accessing wrong role
  if (requiredRole && role !== requiredRole) {
    if (role === "ADMIN") return <Navigate to="/admin" replace />;
    if (role === "MANAGER") return <Navigate to="/manager" replace />;
    if (role === "USER") return <Navigate to="/user" replace />;
    return <Navigate to="/login" replace />;
  }

  // Allow access to nested routes
  return <Outlet />;
};

export default ProtectedRoute;
