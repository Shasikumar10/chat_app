import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = ({ user, redirect = "/login" }) => {
  return user ? <Outlet /> : <Navigate to={redirect} replace />;
};

export default ProtectRoute;
