import React from "react";
import { useUserContext } from "../libs/UserContext";
import { Navigate } from "react-router-dom";
function PrivateRoute({ children }) {
  const { userId } = useUserContext();

  return <div>{userId ? <div>{children}</div> : <Navigate to={-1} />}</div>;
}

export default PrivateRoute;
