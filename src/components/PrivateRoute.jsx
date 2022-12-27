import React from "react";
import { Navigate } from "react-router";

function PrivateRoute({ children }) {
  return <div>{children} </div>;
}

export default PrivateRoute;
