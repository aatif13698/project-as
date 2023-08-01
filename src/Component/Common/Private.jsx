import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function Private() {
  const auth = localStorage.getItem("token")
//   console.log("private", auth);
  return auth ? <Outlet />: <Navigate to="/" /> ;
}