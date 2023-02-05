import React from "react";
import { useUserContext } from "../libs/UserContext";
import { Navigate } from "react-router-dom";

function PrivateRouteAdmin({ children }) {
  const { userInfo } = useUserContext();

  return (
    <div>
      {!userInfo._id ? (
        <div>Loading</div>
      ) : userInfo.is_admin ? (
        <div>{children}</div>
      ) : (
        <Navigate to={-1} />
      )}
    </div>
  );
}

export default PrivateRouteAdmin;
