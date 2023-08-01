import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function Public() {
  const auth = localStorage.getItem("token")
//   console.log("private", auth);
return auth ? <Navigate to="/dashboard" /> : <Outlet />;

}