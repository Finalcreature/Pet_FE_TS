import React from "react";
import { Navigate } from "react-router";

function PrivateRoute({ children }) {
  // return auth.currentUser ? (
  //   <div>{children} </div>
  // ) : (
  //   <Navigate to={"/Sign"}></Navigate>
  // );
}

export default PrivateRoute;
