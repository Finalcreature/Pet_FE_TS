import React from "react";
import { useUserContext } from "../libs/UserContext";
import { Navigate } from "react-router-dom";

function PrivateRouteAdmin({ children }: { children: React.ReactNode }) {
  const { userInfo } = useUserContext();

  return (
    <div>
      {!userInfo ? (
        <div>Loading</div>
      ) : "is_admin" in userInfo && userInfo.is_admin ? (
        <div>{children}</div>
      ) : (
        <h1 className="text-center"> Nothing to see here </h1>
      )}
    </div>
  );
}

export default PrivateRouteAdmin;
