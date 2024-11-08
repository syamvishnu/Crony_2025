import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ component: Component }) {
  const user = true; 
  const auth = user;

  return auth ? <Component /> : <Navigate to="/" />;
}

export default ProtectedRoutes;